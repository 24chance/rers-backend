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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
let RolesService = class RolesService {
    database;
    constructor(database) {
        this.database = database;
    }
    async findAll() {
        return this.database.role.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
                _count: { select: { users: true } },
            },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const role = await this.database.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
                _count: { select: { users: true } },
            },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with id "${id}" not found.`);
        }
        return role;
    }
    async assignPermission(roleId, dto) {
        await this.findOne(roleId);
        const permission = await this.database.permission.findUnique({
            where: { id: dto.permissionId },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with id "${dto.permissionId}" not found.`);
        }
        const existing = await this.database.rolePermission.findUnique({
            where: {
                roleId_permissionId: { roleId, permissionId: dto.permissionId },
            },
        });
        if (existing) {
            throw new common_1.ConflictException(`Permission "${permission.name}" is already assigned to this role.`);
        }
        await this.database.rolePermission.create({
            data: { roleId, permissionId: dto.permissionId },
        });
        return this.findOne(roleId);
    }
    async removePermission(roleId, permId) {
        await this.findOne(roleId);
        const existing = await this.database.rolePermission.findUnique({
            where: { roleId_permissionId: { roleId, permissionId: permId } },
        });
        if (!existing) {
            throw new common_1.NotFoundException(`Permission "${permId}" is not assigned to this role.`);
        }
        await this.database.rolePermission.delete({
            where: { roleId_permissionId: { roleId, permissionId: permId } },
        });
        return this.findOne(roleId);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RolesService);
//# sourceMappingURL=roles.service.js.map