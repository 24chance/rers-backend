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
            return this.getApplicantDashboard(userId);
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
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                application: { select: { id: true, title: true, referenceNumber: true } },
            },
        });
        return {
            assignedReviews,
            completedReviews,
            pendingReviews: Math.max(0, assignedReviews - completedReviews),
            recentAssignments: recentAssignments.map((a) => ({
                id: a.id,
                applicationId: a.applicationId,
                applicationTitle: a.application?.title ?? '',
                referenceNumber: a.application?.referenceNumber ?? '',
                deadline: a.dueDate ? new Date(a.dueDate).toISOString() : undefined,
                isComplete: !a.isActive,
            })),
        };
    }
    async getApplicantSummary(userId) {
        return this.getApplicantDashboard(userId);
    }
    async getTenantSummary(tenantId) {
        const where = tenantId ? { tenantId } : {};
        const [totalApplications, pendingScreening, underReview, approved, conditionallyApproved, rejected, paymentPending, activeMonitoring,] = await this.database.$transaction([
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
                where: { ...where, status: enums_1.ApplicationStatus.CONDITIONALLY_APPROVED },
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
        const applicationsByStatus = [
            { status: enums_1.ApplicationStatus.SCREENING, count: pendingScreening },
            { status: enums_1.ApplicationStatus.UNDER_REVIEW, count: underReview },
            { status: enums_1.ApplicationStatus.APPROVED, count: approved },
            { status: enums_1.ApplicationStatus.CONDITIONALLY_APPROVED, count: conditionallyApproved },
            { status: enums_1.ApplicationStatus.REJECTED, count: rejected },
            { status: enums_1.ApplicationStatus.PAYMENT_PENDING, count: paymentPending },
            { status: enums_1.ApplicationStatus.MONITORING_ACTIVE, count: activeMonitoring },
        ];
        const reviewerWorkload = await this.database.reviewAssignment.groupBy({
            by: ['reviewerId'],
            where: { isActive: true, ...(tenantId ? { application: { tenantId } } : {}) },
            _count: { reviewerId: true },
        });
        const reviewerIds = reviewerWorkload.map((r) => r.reviewerId);
        const reviewers = reviewerIds.length > 0
            ? await this.database.user.findMany({
                where: { id: { in: reviewerIds } },
                select: { id: true, firstName: true, lastName: true },
            })
            : [];
        const reviewerMap = new Map(reviewers.map((r) => [r.id, r]));
        const workload = reviewerWorkload.map((r) => ({
            reviewerId: r.reviewerId,
            name: reviewerMap.has(r.reviewerId)
                ? `${reviewerMap.get(r.reviewerId).firstName} ${reviewerMap.get(r.reviewerId).lastName}`
                : 'Unknown',
            assignedCount: r._count.reviewerId,
        }));
        const recentTransitions = await this.database.workflowTransition.findMany({
            where: tenantId ? { application: { tenantId } } : {},
            orderBy: { createdAt: 'desc' },
            take: 8,
            include: {
                application: { select: { id: true, referenceNumber: true, title: true } },
            },
        });
        const actorIds = [
            ...new Set(recentTransitions.filter((t) => t.actorId).map((t) => t.actorId)),
        ];
        const actors = actorIds.length > 0
            ? await this.database.user.findMany({
                where: { id: { in: actorIds } },
                select: { id: true, firstName: true, lastName: true },
            })
            : [];
        const actorMap = new Map(actors.map((a) => [a.id, a]));
        const recentActivity = recentTransitions.map((t) => ({
            applicationId: t.applicationId,
            referenceNumber: t.application?.referenceNumber ?? 'N/A',
            action: t.toStatus,
            actorName: t.actorId && actorMap.has(t.actorId)
                ? `${actorMap.get(t.actorId).firstName} ${actorMap.get(t.actorId).lastName}`
                : 'System',
            createdAt: new Date(t.createdAt).toISOString(),
        }));
        return {
            totalApplications,
            pendingScreening,
            underReview,
            approved,
            conditionallyApproved,
            rejected,
            paymentPending,
            activeMonitoring,
            applicationsByStatus,
            recentActivity,
            reviewerWorkload: workload,
        };
    }
    async getRnecSummary() {
        const global = await this.getTenantSummary();
        const tenants = await this.database.tenant.findMany({
            where: { isActive: true },
            select: { id: true, name: true, code: true, isActive: true },
        });
        const tenantStats = await Promise.all(tenants.map(async (tenant) => {
            const [total, tenantApproved, pending, tenantRejected] = await this.database.$transaction([
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
                tenant: {
                    id: tenant.id,
                    name: tenant.name,
                    code: tenant.code,
                    isActive: tenant.isActive,
                },
                total,
                approved: tenantApproved,
                pending,
                rejected: tenantRejected,
            };
        }));
        return {
            totalApplications: global.totalApplications,
            totalApproved: global.approved,
            totalPending: global.underReview,
            totalRejected: global.rejected,
            tenantStats,
        };
    }
    async getSystemAdminDashboard() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const [totalUsers, totalTenants, totalRoles, recentAuditEvents] = await this.database.$transaction([
            this.database.user.count({}),
            this.database.tenant.count({}),
            this.database.role.count({}),
            this.database.auditLog.count({
                where: { createdAt: { gte: sevenDaysAgo } },
            }),
        ]);
        return { totalUsers, totalTenants, totalRoles, recentAuditEvents };
    }
};
exports.DashboardsService = DashboardsService;
exports.DashboardsService = DashboardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DashboardsService);
//# sourceMappingURL=dashboards.service.js.map