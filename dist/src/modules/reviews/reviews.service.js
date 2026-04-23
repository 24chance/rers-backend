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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
let ReviewsService = class ReviewsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async findReviewById(id) {
        return this.database.review.findUnique({
            where: { id },
            include: this.defaultInclude(),
        });
    }
    async openReviewFromAssignmentId(assignmentId, reviewerId, missingEntityLabel = 'Review') {
        const assignment = await this.database.reviewAssignment.findUnique({
            where: { id: assignmentId },
        });
        if (!assignment) {
            throw new common_1.NotFoundException(`${missingEntityLabel} "${assignmentId}" not found.`);
        }
        if (assignment.reviewerId !== reviewerId) {
            throw new common_1.ForbiddenException('You do not have access to this review.');
        }
        const existingReview = await this.database.review.findFirst({
            where: {
                applicationId: assignment.applicationId,
                reviewerId: assignment.reviewerId,
            },
            include: this.defaultInclude(),
        });
        if (existingReview) {
            return existingReview;
        }
        if (!assignment.isActive) {
            throw new common_1.BadRequestException('This assignment is no longer active.');
        }
        if (assignment.conflictDeclared) {
            throw new common_1.BadRequestException('You cannot open a review for an assignment with a declared conflict.');
        }
        return this.database.review.create({
            data: {
                applicationId: assignment.applicationId,
                reviewerId: assignment.reviewerId,
            },
            include: this.defaultInclude(),
        });
    }
    async startReview(applicationId, reviewerId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        const assignment = await this.database.reviewAssignment.findFirst({
            where: {
                applicationId,
                reviewerId,
                isActive: true,
                conflictDeclared: false,
            },
        });
        if (!assignment) {
            throw new common_1.ForbiddenException('You do not have an active assignment for this application.');
        }
        const existing = await this.database.review.findFirst({
            where: { applicationId, reviewerId },
        });
        if (existing) {
            throw new common_1.BadRequestException('You have already started a review for this application.');
        }
        return this.database.review.create({
            data: {
                applicationId,
                reviewerId,
            },
            include: this.defaultInclude(),
        });
    }
    async openReviewForAssignment(assignmentId, reviewerId) {
        return this.openReviewFromAssignmentId(assignmentId, reviewerId, 'Assignment');
    }
    async submitReview(reviewId, reviewerId, dto) {
        const directReview = await this.database.review.findUnique({
            where: { id: reviewId },
        });
        const review = directReview ??
            (await this.openReviewFromAssignmentId(reviewId, reviewerId));
        if (review.reviewerId !== reviewerId) {
            throw new common_1.ForbiddenException('You can only submit your own reviews.');
        }
        if (review.isComplete) {
            throw new common_1.BadRequestException('This review has already been submitted.');
        }
        const updatedReview = await this.database.review.update({
            where: { id: review.id },
            data: {
                comments: dto.comments,
                recommendation: dto.recommendation,
                conditions: dto.conditions,
                isComplete: true,
                completedAt: new Date(),
            },
            include: this.defaultInclude(),
        });
        const [application, assignments, completedReviews] = await Promise.all([
            this.database.application.findUnique({
                where: { id: review.applicationId },
                select: { status: true },
            }),
            this.database.reviewAssignment.findMany({
                where: {
                    applicationId: review.applicationId,
                    isActive: true,
                    conflictDeclared: false,
                },
            }),
            this.database.review.findMany({
                where: {
                    applicationId: review.applicationId,
                    isComplete: true,
                },
                select: { reviewerId: true },
            }),
        ]);
        const completedReviewerIds = new Set(completedReviews.map((entry) => entry.reviewerId));
        const allActiveAssignmentsCompleted = assignments.length > 0
            && assignments.every((assignment) => completedReviewerIds.has(assignment.reviewerId));
        if (application?.status === enums_1.ApplicationStatus.UNDER_REVIEW
            && allActiveAssignmentsCompleted) {
            await this.database.application.update({
                where: { id: review.applicationId },
                data: { status: enums_1.ApplicationStatus.DECISION_PENDING },
            });
            await this.database.workflowTransition.create({
                data: {
                    applicationId: review.applicationId,
                    fromStatus: enums_1.ApplicationStatus.UNDER_REVIEW,
                    toStatus: enums_1.ApplicationStatus.DECISION_PENDING,
                    actorId: reviewerId,
                    reason: 'All assigned reviewers submitted their reviews',
                },
            });
        }
        return updatedReview;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        return this.database.review.findMany({
            where: { applicationId },
            include: this.defaultInclude(),
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByReviewer(reviewerId) {
        return this.database.review.findMany({
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
    async findAssignmentsForReviewer(reviewerId) {
        return this.database.reviewAssignment.findMany({
            where: {
                reviewerId,
                isActive: true,
            },
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
    async findOne(id, reviewerId) {
        const review = await this.findReviewById(id);
        if (review) {
            if (review.reviewerId !== reviewerId) {
                throw new common_1.ForbiddenException('You do not have access to this review.');
            }
            return review;
        }
        return this.openReviewFromAssignmentId(id, reviewerId);
    }
    defaultInclude() {
        return {
            reviewer: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            application: {
                select: {
                    id: true,
                    referenceNumber: true,
                    title: true,
                    type: true,
                    status: true,
                },
            },
        };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map