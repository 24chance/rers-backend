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
exports.DashboardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const dashboards_service_1 = require("./dashboards.service");
let DashboardsController = class DashboardsController {
    dashboardsService;
    constructor(dashboardsService) {
        this.dashboardsService = dashboardsService;
    }
    getSummary(user) {
        return this.dashboardsService.getSummary(user.role, user.id, user.tenantId);
    }
    getApplicantDashboard(user) {
        return this.dashboardsService.getApplicantDashboard(user.id);
    }
    getReviewerDashboard(user) {
        return this.dashboardsService.getReviewerDashboard(user.id);
    }
    getIrbAdminDashboard(user) {
        return this.dashboardsService.getSummary(user.role, user.id, user.tenantId);
    }
    getRnecSummary() {
        return this.dashboardsService.getRnecSummary();
    }
    getRnecAdminDashboard() {
        return this.dashboardsService.getRnecSummary();
    }
    getSystemAdminDashboard() {
        return this.dashboardsService.getRnecSummary();
    }
    getChairpersonDashboard(user) {
        return this.dashboardsService.getSummary(user.role, user.id, user.tenantId);
    }
    getFinanceDashboard(user) {
        return this.dashboardsService.getSummary(user.role, user.id, user.tenantId);
    }
};
exports.DashboardsController = DashboardsController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get role-scoped dashboard summary (authenticated)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard summary returned.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getSummary", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.APPLICANT),
    (0, common_1.Get)('applicant'),
    (0, swagger_1.ApiOperation)({ summary: 'Applicant dashboard' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getApplicantDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.REVIEWER),
    (0, common_1.Get)('reviewer'),
    (0, swagger_1.ApiOperation)({ summary: 'Reviewer dashboard' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getReviewerDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN),
    (0, common_1.Get)('irb_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'IRB Admin dashboard' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getIrbAdminDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)('rnec'),
    (0, swagger_1.ApiOperation)({ summary: 'Full cross-tenant dashboard (RNEC_ADMIN / SYSTEM_ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cross-tenant summary returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getRnecSummary", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)('rnec_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'RNEC admin dashboard alias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getRnecAdminDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)('system_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'System admin dashboard' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getSystemAdminDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CHAIRPERSON),
    (0, common_1.Get)('chairperson'),
    (0, swagger_1.ApiOperation)({ summary: 'Chairperson dashboard' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getChairpersonDashboard", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_OFFICER),
    (0, common_1.Get)('finance_officer'),
    (0, swagger_1.ApiOperation)({ summary: 'Finance officer dashboard' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardsController.prototype, "getFinanceDashboard", null);
exports.DashboardsController = DashboardsController = __decorate([
    (0, swagger_1.ApiTags)('dashboards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('dashboards'),
    __metadata("design:paramtypes", [dashboards_service_1.DashboardsService])
], DashboardsController);
//# sourceMappingURL=dashboards.controller.js.map