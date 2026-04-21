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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const invoices_service_1 = require("./invoices.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
let InvoicesController = class InvoicesController {
    invoicesService;
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    create(applicationId, dto) {
        return this.invoicesService.create(applicationId, dto);
    }
    findByApplication(applicationId) {
        return this.invoicesService.findByApplication(applicationId);
    }
    findAll() {
        return this.invoicesService.findAll();
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)('application/:applicationId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create an invoice for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Invoice created.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('application/:applicationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all invoices for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoices returned.' }),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findByApplication", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all invoices (FINANCE_OFFICER / admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Invoices returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, swagger_1.ApiTags)('invoices'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
//# sourceMappingURL=invoices.controller.js.map