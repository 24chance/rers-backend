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
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const applications_service_1 = require("./applications.service");
const advance_status_dto_1 = require("./dto/advance-status.dto");
const create_application_dto_1 = require("./dto/create-application.dto");
const query_applications_dto_1 = require("./dto/query-applications.dto");
const screen_application_dto_1 = require("./dto/screen-application.dto");
const submit_application_dto_1 = require("./dto/submit-application.dto");
const update_application_dto_1 = require("./dto/update-application.dto");
let ApplicationsController = class ApplicationsController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    create(dto, user) {
        return this.applicationsService.create(user.id, user.tenantId ?? null, dto);
    }
    findAll(filters, user) {
        return this.applicationsService.findAll(user.id, user.role, user.tenantId, filters);
    }
    findOne(id, user) {
        return this.applicationsService.findOne(id, user.id, user.role);
    }
    update(id, dto, user) {
        return this.applicationsService.update(id, user.id, dto);
    }
    remove(id, user) {
        return this.applicationsService.remove(id, user.id);
    }
    submit(id, _dto, user) {
        return this.applicationsService.submit(id, user.id);
    }
    screen(id, dto, user) {
        return this.applicationsService.screen(id, user.id, dto);
    }
    advanceStatus(id, dto, user) {
        return this.applicationsService.advanceStatus(id, user.id, dto);
    }
    getTimeline(id) {
        return this.applicationsService.getTimeline(id);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new application in DRAFT status' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Application created.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'List applications (role-scoped: applicants see own, IRB_ADMIN sees tenant, RNEC/SYSTEM see all)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated list of applications.' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_applications_dto_1.QueryApplicationsDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single application by id (role-scoped)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application record returned.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a DRAFT application (applicant only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application updated.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Application is not in DRAFT status.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a DRAFT application (applicant only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Application deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Application is not in DRAFT status.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/submit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit an application (validates documents attached, sets SUBMITTED status, generates referenceNumber)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application submitted.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'No documents attached or not in DRAFT.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_application_dto_1.SubmitApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "submit", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(':id/screen'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Screen an application: PASS → UNDER_REVIEW, RAISE_QUERY → QUERY_RAISED, REQUEST_PAYMENT → PAYMENT_PENDING',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Application screened; new status returned.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Application is not in SCREENING status.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, screen_application_dto_1.ScreenApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "screen", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN, user_role_enum_1.UserRole.CHAIRPERSON, user_role_enum_1.UserRole.FINANCE_OFFICER),
    (0, common_1.Patch)(':id/status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Generic status advance endpoint (validates state machine transitions)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status advanced.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid transition.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, advance_status_dto_1.AdvanceStatusDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "advanceStatus", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the workflow timeline for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Workflow timeline returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getTimeline", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, swagger_1.ApiTags)('applications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map