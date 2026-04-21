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
exports.ReviewerAssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
let ReviewerAssignmentsService = class ReviewerAssignmentsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async assign(assignedById, dto) {
        const application = await this.database.application.findUnique({
            where: { id: dto.applicationId },
            select: { id: true, status: true, title: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${dto.applicationId}" not found.`);
        }
        const reviewer = await this.database.user.findUnique({
            where: { id: dto.reviewerId },
            select: { id: true, firstName: true, lastName: true, email: true },
        });
        if (!reviewer) {
            throw new common_1.NotFoundException(`Reviewer "${dto.reviewerId}" not found.`);
        }
        const existing = await this.database.reviewAssignment.findFirst({
            where: {
                applicationId: dto.applicationId,
                reviewerId: dto.reviewerId,
                isActive: true,
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('This reviewer is already actively assigned to this application.');
        }
        const assignment = await this.database.reviewAssignment.create({
            data: {
                applicationId: dto.applicationId,
                reviewerId: dto.reviewerId,
                assignedById,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            },
            include: {
                application: { select: { id: true, title: true, referenceNumber: true } },
                reviewer: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
        if (application.status !== enums_1.ApplicationStatus.UNDER_REVIEW &&
            application.status !== enums_1.ApplicationStatus.APPROVED &&
            application.status !== enums_1.ApplicationStatus.CONDITIONALLY_APPROVED) {
            await this.database.application.update({
                where: { id: dto.applicationId },
                data: { status: enums_1.ApplicationStatus.UNDER_REVIEW },
            });
            await this.database.workflowTransition.create({
                data: {
                    applicationId: dto.applicationId,
                    fromStatus: application.status,
                    toStatus: enums_1.ApplicationStatus.UNDER_REVIEW,
                    actorId: assignedById,
                    reason: 'Reviewer assigned — application moved to UNDER_REVIEW',
                },
            });
        }
        await this.database.notification.create({
            data: {
                userId: dto.reviewerId,
                type: enums_1.NotificationType.REVIEWER_ASSIGNED,
                title: 'New Review Assignment',
                message: `You have been assigned to review application: ${application.title}`,
                metadata: { applicationId: dto.applicationId },
            },
        });
        return assignment;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        return this.database.reviewAssignment.findMany({
            where: { applicationId },
            include: {
                reviewer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByReviewer(reviewerId) {
        return this.database.reviewAssignment.findMany({
            where: { reviewerId },
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        type: true,
                        status: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async declareConflict(assignmentId, reviewerId, reason) {
        const assignment = await this.database.reviewAssignment.findUnique({
            where: { id: assignmentId },
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment "${assignmentId}" not found.`);
        }
        if (assignment.reviewerId !== reviewerId) {
            throw new common_1.ForbiddenException('You can only declare conflict on your own assignments.');
        }
        if (assignment.conflictDeclared) {
            throw new common_1.BadRequestException('Conflict has already been declared for this assignment.');
        }
        return this.database.reviewAssignment.update({
            where: { id: assignmentId },
            data: {
                conflictDeclared: true,
                conflictReason: reason,
                isActive: false,
            },
        });
    }
    async deactivate(assignmentId, adminId) {
        const assignment = await this.database.reviewAssignment.findUnique({
            where: { id: assignmentId },
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`Assignment "${assignmentId}" not found.`);
        }
        if (!assignment.isActive) {
            throw new common_1.BadRequestException('Assignment is already inactive.');
        }
        return this.database.reviewAssignment.update({
            where: { id: assignmentId },
            data: { isActive: false },
        });
    }
};
exports.ReviewerAssignmentsService = ReviewerAssignmentsService;
exports.ReviewerAssignmentsService = ReviewerAssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReviewerAssignmentsService);
//# sourceMappingURL=reviewer-assignments.service.js.map