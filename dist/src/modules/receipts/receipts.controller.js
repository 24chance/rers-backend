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
exports.ReceiptsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const receipts_service_1 = require("./receipts.service");
let ReceiptsController = class ReceiptsController {
    receiptsService;
    constructor(receiptsService) {
        this.receiptsService = receiptsService;
    }
    findAll(user) {
        const tenantId = user.role === user_role_enum_1.UserRole.FINANCE_OFFICER || user.role === user_role_enum_1.UserRole.IRB_ADMIN
            ? (user.tenantId ?? undefined)
            : undefined;
        return this.receiptsService.findAll(tenantId);
    }
    findOne(id) {
        return this.receiptsService.findOne(id);
    }
    findByPayment(paymentId) {
        return this.receiptsService.findByPayment(paymentId);
    }
};
exports.ReceiptsController = ReceiptsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all receipts (FINANCE_OFFICER / admin)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipts returned.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single receipt by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Receipt UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Receipt not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('payment/:paymentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get receipt for a payment' }),
    (0, swagger_1.ApiParam)({ name: 'paymentId', description: 'Payment UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found.' }),
    __param(0, (0, common_1.Param)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReceiptsController.prototype, "findByPayment", null);
exports.ReceiptsController = ReceiptsController = __decorate([
    (0, swagger_1.ApiTags)('receipts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('receipts'),
    __metadata("design:paramtypes", [receipts_service_1.ReceiptsService])
], ReceiptsController);
//# sourceMappingURL=receipts.controller.js.map