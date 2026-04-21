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
const database_service_1 = require("../../common/database/database.service");
let ReviewsService = class ReviewsService {
    database;
    constructor(database) {
        this.database = database;
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
    async submitReview(reviewId, reviewerId, dto) {
        const review = await this.database.review.findUnique({
            where: { id: reviewId },
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review "${reviewId}" not found.`);
        }
        if (review.reviewerId !== reviewerId) {
            throw new common_1.ForbiddenException('You can only submit your own reviews.');
        }
        if (review.isComplete) {
            throw new common_1.BadRequestException('This review has already been submitted.');
        }
        return this.database.review.update({
            where: { id: reviewId },
            data: {
                comments: dto.comments,
                recommendation: dto.recommendation,
                conditions: dto.conditions,
                isComplete: true,
                completedAt: new Date(),
            },
            include: this.defaultInclude(),
        });
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
    async findOne(id, reviewerId) {
        const review = await this.database.review.findUnique({
            where: { id },
            include: this.defaultInclude(),
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review "${id}" not found.`);
        }
        if (review.reviewerId !== reviewerId) {
            throw new common_1.ForbiddenException('You do not have access to this review.');
        }
        return review;
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