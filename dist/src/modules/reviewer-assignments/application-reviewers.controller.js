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
exports.ApplicationReviewersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const reviewer_assignments_service_1 = require("./reviewer-assignments.service");
const assign_application_reviewer_dto_1 = require("./dto/assign-application-reviewer.dto");
let ApplicationReviewersController = class ApplicationReviewersController {
    reviewerAssignmentsService;
    constructor(reviewerAssignmentsService) {
        this.reviewerAssignmentsService = reviewerAssignmentsService;
    }
    assign(applicationId, dto, user) {
        return this.reviewerAssignmentsService.assign(user.id, {
            applicationId,
            reviewerId: dto.reviewerId,
            dueDate: dto.dueDate,
        });
    }
    findByApplication(applicationId) {
        return this.reviewerAssignmentsService.findByApplication(applicationId);
    }
};
exports.ApplicationReviewersController = ApplicationReviewersController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a reviewer to an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Assignment created.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Already assigned or invalid body.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Application or reviewer not found.',
    }),
    __param(0, (0, common_1.Param)('applicationId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_application_reviewer_dto_1.AssignApplicationReviewerDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationReviewersController.prototype, "assign", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviewer assignments for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignments returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('applicationId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationReviewersController.prototype, "findByApplication", null);
exports.ApplicationReviewersController = ApplicationReviewersController = __decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('applications/:applicationId/reviewers'),
    __metadata("design:paramtypes", [reviewer_assignments_service_1.ReviewerAssignmentsService])
], ApplicationReviewersController);
//# sourceMappingURL=application-reviewers.controller.js.map