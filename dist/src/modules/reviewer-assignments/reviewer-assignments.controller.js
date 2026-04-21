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
exports.ReviewerAssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const reviewer_assignments_service_1 = require("./reviewer-assignments.service");
const create_assignment_dto_1 = require("./dto/create-assignment.dto");
const update_assignment_dto_1 = require("./dto/update-assignment.dto");
let ReviewerAssignmentsController = class ReviewerAssignmentsController {
    reviewerAssignmentsService;
    constructor(reviewerAssignmentsService) {
        this.reviewerAssignmentsService = reviewerAssignmentsService;
    }
    assign(dto, user) {
        return this.reviewerAssignmentsService.assign(user.id, dto);
    }
    findByApplication(applicationId) {
        return this.reviewerAssignmentsService.findByApplication(applicationId);
    }
    findByReviewer(reviewerId) {
        return this.reviewerAssignmentsService.findByReviewer(reviewerId);
    }
    declareConflict(id, dto, user) {
        return this.reviewerAssignmentsService.declareConflict(id, user.id, dto.conflictReason ?? '');
    }
    deactivate(id, user) {
        return this.reviewerAssignmentsService.deactivate(id, user.id);
    }
};
exports.ReviewerAssignmentsController = ReviewerAssignmentsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a reviewer to an application (IRB_ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Assignment created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already assigned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application or reviewer not found.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewerAssignmentsController.prototype, "assign", null);
__decorate([
    (0, common_1.Get)('application/:applicationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assignments for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignments returned.' }),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewerAssignmentsController.prototype, "findByApplication", null);
__decorate([
    (0, common_1.Get)('reviewer/:reviewerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assignments for a reviewer' }),
    (0, swagger_1.ApiParam)({ name: 'reviewerId', description: 'Reviewer user UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignments returned.' }),
    __param(0, (0, common_1.Param)('reviewerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReviewerAssignmentsController.prototype, "findByReviewer", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.REVIEWER),
    (0, common_1.Patch)(':id/conflict'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Declare conflict of interest on assignment (REVIEWER)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Assignment UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conflict declared.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already declared or invalid.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assignment_dto_1.UpdateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewerAssignmentsController.prototype, "declareConflict", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Patch)(':id/deactivate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Deactivate an assignment (IRB_ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Assignment UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignment deactivated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already inactive.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Assignment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReviewerAssignmentsController.prototype, "deactivate", null);
exports.ReviewerAssignmentsController = ReviewerAssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('reviewer-assignments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('reviewer-assignments'),
    __metadata("design:paramtypes", [reviewer_assignments_service_1.ReviewerAssignmentsService])
], ReviewerAssignmentsController);
//# sourceMappingURL=reviewer-assignments.controller.js.map