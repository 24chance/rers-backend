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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const assign_permission_dto_1 = require("./dto/assign-permission.dto");
const roles_service_1 = require("./roles.service");
let RolesController = class RolesController {
    rolesService;
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    findAll() {
        return this.rolesService.findAll();
    }
    findOne(id) {
        return this.rolesService.findOne(id);
    }
    assignPermission(id, dto) {
        return this.rolesService.assignPermission(id, dto);
    }
    removePermission(id, permId) {
        return this.rolesService.removePermission(id, permId);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all roles with their permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Array of roles returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single role by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Role UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Role record returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Role not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(':id/permissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a permission to a role (SYSTEM_ADMIN only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Role UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permission assigned; updated role returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Role or permission not found.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Permission already assigned.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_permission_dto_1.AssignPermissionDto]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "assignPermission", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Delete)(':id/permissions/:permId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove a permission from a role (SYSTEM_ADMIN only)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Role UUID' }),
    (0, swagger_1.ApiParam)({ name: 'permId', description: 'Permission UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permission removed; updated role returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Role or permission assignment not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('permId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RolesController.prototype, "removePermission", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map