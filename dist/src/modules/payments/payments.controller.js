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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const payments_service_1 = require("./payments.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const verify_payment_dto_1 = require("./dto/verify-payment.dto");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    create(invoiceId, dto) {
        return this.paymentsService.create(invoiceId, dto);
    }
    findByInvoice(invoiceId) {
        return this.paymentsService.findByInvoice(invoiceId);
    }
    findAll(user) {
        const tenantId = user.role === user_role_enum_1.UserRole.FINANCE_OFFICER || user.role === user_role_enum_1.UserRole.IRB_ADMIN
            ? (user.tenantId ?? undefined)
            : undefined;
        return this.paymentsService.findAll(tenantId);
    }
    verify(id, dto, user) {
        return this.paymentsService.verify(id, user.id, dto);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('invoices/:invoiceId/payments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Submit payment for an invoice (applicant)' }),
    (0, swagger_1.ApiParam)({ name: 'invoiceId', description: 'Invoice UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invoice already paid.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invoice not found.' }),
    __param(0, (0, common_1.Param)('invoiceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('invoices/:invoiceId/payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments for an invoice' }),
    (0, swagger_1.ApiParam)({ name: 'invoiceId', description: 'Invoice UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payments returned.' }),
    __param(0, (0, common_1.Param)('invoiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findByInvoice", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)('payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments (FINANCE_OFFICER / admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payments returned.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Patch)('payments/:id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a payment (FINANCE_OFFICER)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payment UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment verified.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already verified.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, verify_payment_dto_1.VerifyPaymentDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "verify", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map