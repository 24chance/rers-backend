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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_tenant_dto_1 = require("./dto/create-tenant.dto");
const query_tenant_dto_1 = require("./dto/query-tenant.dto");
const update_tenant_dto_1 = require("./dto/update-tenant.dto");
const tenants_service_1 = require("./tenants.service");
let TenantsController = class TenantsController {
    tenantsService;
    constructor(tenantsService) {
        this.tenantsService = tenantsService;
    }
    create(dto) {
        return this.tenantsService.create(dto);
    }
    findAll(query) {
        return this.tenantsService.findAll(query);
    }
    findOne(id) {
        return this.tenantsService.findOne(id);
    }
    getStats(id) {
        return this.tenantsService.getTenantStats(id);
    }
    update(id, dto) {
        return this.tenantsService.update(id, dto);
    }
    remove(id) {
        return this.tenantsService.remove(id);
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tenant (RNEC_ADMIN, SYSTEM_ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tenant created.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Tenant code already exists.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tenant_dto_1.CreateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List tenants with pagination and filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated list of tenants.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_tenant_dto_1.QueryTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single tenant by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Tenant UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tenant record returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics for a tenant' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Tenant UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tenant statistics returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "getStats", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a tenant (RNEC_ADMIN, SYSTEM_ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Tenant UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tenant updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tenant_dto_1.UpdateTenantDto]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Deactivate a tenant (RNEC_ADMIN, SYSTEM_ADMIN)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Tenant UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tenant deactivated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Tenant not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TenantsController.prototype, "remove", null);
exports.TenantsController = TenantsController = __decorate([
    (0, swagger_1.ApiTags)('tenants'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map