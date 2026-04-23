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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const reviews_service_1 = require("./reviews.service");
const create_review_dto_1 = require("./dto/create-review.dto");
const submit_review_dto_1 = require("./dto/submit-review.dto");
let ReviewsController = class ReviewsController {
    reviewsService;
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    startReview(dto, user) {
        return this.reviewsService.startReview(dto.applicationId, user.id);
    }
    findByApplication(applicationId) {
        return this.reviewsService.findByApplication(applicationId);
    }
    findByReviewer(reviewerId) {
        return this.reviewsService.findByReviewer(reviewerId);
    }
    findAssignments(user) {
        return this.reviewsService.findAssignmentsForReviewer(user.id);
    }
    openAssignmentReview(assignmentId, user) {
        return this.reviewsService.openReviewForAssignment(assignmentId, user.id);
    }
    findOne(id, user) {
        return this.reviewsService.findOne(id, user.id);
    }
    submitReview(id, dto, user) {
        return this.reviewsService.submitReview(id, user.id, dto);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Start a review for an assigned application' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review started.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already started.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'No active assignment.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "startReview", null);
__decorate([
    (0, common_1.Get)('application/:applicationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews returned.' }),
    __param(0, (0, common_1.Param)('applicationId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findByApplication", null);
__decorate([
    (0, common_1.Get)('reviewer/:reviewerId'),
    (0, swagger_1.ApiOperation)({ summary: "Get a reviewer's own reviews" }),
    (0, swagger_1.ApiParam)({ name: 'reviewerId', description: 'Reviewer UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Reviews returned.' }),
    __param(0, (0, common_1.Param)('reviewerId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findByReviewer", null);
__decorate([
    (0, common_1.Get)('assignments'),
    (0, swagger_1.ApiOperation)({ summary: "Get the current reviewer's assignments" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignments returned.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findAssignments", null);
__decorate([
    (0, common_1.Post)('assignments/:assignmentId/open'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get or create the review for an assignment (reviewer only)',
    }),
    (0, swagger_1.ApiParam)({ name: 'assignmentId', description: 'Review assignment UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review returned.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Assignment is inactive or conflicted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignment not found.' }),
    __param(0, (0, common_1.Param)('assignmentId', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "openAssignmentReview", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a single review by review UUID or review-assignment UUID (reviewer only)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Review UUID or review assignment UUID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review returned.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a completed review by review UUID or review-assignment UUID',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Review UUID or review assignment UUID',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review submitted.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already submitted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Review not found.' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_review_dto_1.SubmitReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "submitReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map