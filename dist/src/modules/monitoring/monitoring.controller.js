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
exports.MonitoringController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const monitoring_service_1 = require("./monitoring.service");
const create_amendment_dto_1 = require("./dto/create-amendment.dto");
const create_renewal_dto_1 = require("./dto/create-renewal.dto");
const create_progress_report_dto_1 = require("./dto/create-progress-report.dto");
const create_adverse_event_dto_1 = require("./dto/create-adverse-event.dto");
const create_deviation_dto_1 = require("./dto/create-deviation.dto");
const create_closure_dto_1 = require("./dto/create-closure.dto");
let MonitoringController = class MonitoringController {
    monitoringService;
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
    }
    createAmendment(id, dto, user) {
        return this.monitoringService.createAmendment(id, user.id, dto);
    }
    getAmendments(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.AMENDMENT);
    }
    createRenewal(id, dto, user) {
        return this.monitoringService.createRenewal(id, user.id, dto);
    }
    getRenewals(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.RENEWAL);
    }
    createProgressReport(id, dto, user) {
        return this.monitoringService.createProgressReport(id, user.id, dto);
    }
    getProgressReports(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.PROGRESS_REPORT);
    }
    createAdverseEvent(id, dto, user) {
        return this.monitoringService.createAdverseEvent(id, user.id, dto);
    }
    getAdverseEvents(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.ADVERSE_EVENT);
    }
    createDeviation(id, dto, user) {
        return this.monitoringService.createDeviation(id, user.id, dto);
    }
    getDeviations(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.PROTOCOL_DEVIATION);
    }
    createClosureReport(id, dto, user) {
        return this.monitoringService.createClosureReport(id, user.id, dto);
    }
    getClosureReports(id) {
        return this.monitoringService.getByApplication(id, enums_1.MonitoringType.CLOSURE_REPORT);
    }
};
exports.MonitoringController = MonitoringController;
__decorate([
    (0, common_1.Post)('applications/:id/amendments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit an amendment for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Amendment created.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_amendment_dto_1.CreateAmendmentDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createAmendment", null);
__decorate([
    (0, common_1.Get)('applications/:id/amendments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get amendments for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amendments returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getAmendments", null);
__decorate([
    (0, common_1.Post)('applications/:id/renewals'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a renewal for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Renewal created.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_renewal_dto_1.CreateRenewalDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createRenewal", null);
__decorate([
    (0, common_1.Get)('applications/:id/renewals'),
    (0, swagger_1.ApiOperation)({ summary: 'Get renewals for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Renewals returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getRenewals", null);
__decorate([
    (0, common_1.Post)('applications/:id/progress-reports'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a progress report for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Progress report created.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_progress_report_dto_1.CreateProgressReportDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createProgressReport", null);
__decorate([
    (0, common_1.Get)('applications/:id/progress-reports'),
    (0, swagger_1.ApiOperation)({ summary: 'Get progress reports for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress reports returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getProgressReports", null);
__decorate([
    (0, common_1.Post)('applications/:id/adverse-events'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Report an adverse event for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Adverse event reported.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_adverse_event_dto_1.CreateAdverseEventDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createAdverseEvent", null);
__decorate([
    (0, common_1.Get)('applications/:id/adverse-events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get adverse events for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adverse events returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getAdverseEvents", null);
__decorate([
    (0, common_1.Post)('applications/:id/deviations'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Report a protocol deviation for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Deviation reported.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_deviation_dto_1.CreateDeviationDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createDeviation", null);
__decorate([
    (0, common_1.Get)('applications/:id/deviations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get protocol deviations for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deviations returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getDeviations", null);
__decorate([
    (0, common_1.Post)('applications/:id/closure-reports'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a closure report for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Closure report created.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_closure_dto_1.CreateClosureDto, Object]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createClosureReport", null);
__decorate([
    (0, common_1.Get)('applications/:id/closure-reports'),
    (0, swagger_1.ApiOperation)({ summary: 'Get closure reports for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Closure reports returned.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "getClosureReports", null);
exports.MonitoringController = MonitoringController = __decorate([
    (0, swagger_1.ApiTags)('monitoring'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('monitoring'),
    __metadata("design:paramtypes", [monitoring_service_1.MonitoringService])
], MonitoringController);
//# sourceMappingURL=monitoring.controller.js.map