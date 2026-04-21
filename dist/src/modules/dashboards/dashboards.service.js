"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const database_service_1 = require("../../common/database/database.service");
let DashboardsService = class DashboardsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async getSummary(role, userId, tenantId) {
        if (role === user_role_enum_1.UserRole.APPLICANT) {
            return this.getApplicantSummary(userId);
        }
        if (role === user_role_enum_1.UserRole.RNEC_ADMIN || role === user_role_enum_1.UserRole.SYSTEM_ADMIN) {
            return this.getRnecSummary();
        }
        return this.getTenantSummary(tenantId ?? undefined);
    }
    async getApplicantDashboard(userId) {
        const [totalApplications, draftApplications, underReviewApplications, approvedApplications,] = await this.database.$transaction([
            this.database.application.count({ where: { applicantId: userId } }),
            this.database.application.count({
                where: { applicantId: userId, status: enums_1.ApplicationStatus.DRAFT },
            }),
            this.database.application.count({
                where: { applicantId: userId, status: enums_1.ApplicationStatus.UNDER_REVIEW },
            }),
            this.database.application.count({
                where: { applicantId: userId, status: enums_1.ApplicationStatus.APPROVED },
            }),
        ]);
        const recentApplications = await this.database.application.findMany({
            where: { applicantId: userId },
            orderBy: { updatedAt: 'desc' },
            take: 5,
            select: {
                id: true,
                referenceNumber: true,
                title: true,
                status: true,
                updatedAt: true,
            },
        });
        return {
            totalApplications,
            draftApplications,
            underReviewApplications,
            approvedApplications,
            recentApplications,
        };
    }
    async getReviewerDashboard(userId) {
        const [assignedReviews, completedReviews] = await this.database.$transaction([
            this.database.reviewAssignment.count({ where: { reviewerId: userId, isActive: true } }),
            this.database.review.count({ where: { reviewerId: userId, isComplete: true } }),
        ]);
        const recentAssignments = await this.database.reviewAssignment.findMany({
            where: { reviewerId: userId, isActive: true },
            orderBy: { assignedAt: 'desc' },
            take: 5,
            include: {
                application: { select: { id: true, title: true, referenceNumber: true } },
            },
        });
        return {
            assignedReviews,
            completedReviews,
            pendingReviews: assignedReviews - completedReviews,
            recentAssignments: recentAssignments.map((a) => ({
                id: a.id,
                applicationId: a.applicationId,
                applicationTitle: a.application?.title ?? '',
                referenceNumber: a.application?.referenceNumber ?? '',
                isComplete: !a.isActive,
            })),
        };
    }
    async getApplicantSummary(userId) {
        return this.getApplicantDashboard(userId);
    }
    async getTenantSummary(tenantId) {
        const where = tenantId ? { tenantId } : {};
        const [totalSubmissions, pendingScreening, pendingReview, approved, rejected, paymentPending, activeMonitoring,] = await this.database.$transaction([
            this.database.application.count({ where }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.SCREENING },
            }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.UNDER_REVIEW },
            }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.APPROVED },
            }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.REJECTED },
            }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.PAYMENT_PENDING },
            }),
            this.database.application.count({
                where: { ...where, status: enums_1.ApplicationStatus.MONITORING_ACTIVE },
            }),
        ]);
        const reviewerWorkload = await this.database.reviewAssignment.groupBy({
            by: ['reviewerId'],
            where: { isActive: true, ...(tenantId ? { application: { tenantId } } : {}) },
            _count: { reviewerId: true },
        });
        const reviewerIds = reviewerWorkload.map((r) => r.reviewerId);
        const reviewers = await this.database.user.findMany({
            where: { id: { in: reviewerIds } },
            select: { id: true, firstName: true, lastName: true },
        });
        const reviewerMap = new Map(reviewers.map((r) => [r.id, r]));
        const workload = reviewerWorkload.map((r) => ({
            reviewerId: r.reviewerId,
            name: reviewerMap.has(r.reviewerId)
                ? `${reviewerMap.get(r.reviewerId).firstName} ${reviewerMap.get(r.reviewerId).lastName}`
                : 'Unknown',
            assignedCount: r._count.reviewerId,
        }));
        return {
            totalSubmissions,
            pendingScreening,
            pendingReview,
            approved,
            rejected,
            paymentPending,
            activeMonitoring,
            reviewerWorkload: workload,
        };
    }
    async getRnecSummary() {
        const global = await this.getTenantSummary();
        const tenants = await this.database.tenant.findMany({
            where: { isActive: true },
            select: { id: true, name: true, code: true },
        });
        const tenantBreakdowns = await Promise.all(tenants.map(async (tenant) => {
            const counts = await this.database.$transaction([
                this.database.application.count({ where: { tenantId: tenant.id } }),
                this.database.application.count({
                    where: { tenantId: tenant.id, status: enums_1.ApplicationStatus.APPROVED },
                }),
                this.database.application.count({
                    where: { tenantId: tenant.id, status: enums_1.ApplicationStatus.UNDER_REVIEW },
                }),
                this.database.application.count({
                    where: { tenantId: tenant.id, status: enums_1.ApplicationStatus.REJECTED },
                }),
            ]);
            return {
                tenantId: tenant.id,
                tenantName: tenant.name,
                tenantCode: tenant.code,
                total: counts[0],
                approved: counts[1],
                underReview: counts[2],
                rejected: counts[3],
            };
        }));
        return {
            ...global,
            tenantBreakdowns,
        };
    }
};
exports.DashboardsService = DashboardsService;
exports.DashboardsService = DashboardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DashboardsService);
//# sourceMappingURL=dashboards.service.js.map