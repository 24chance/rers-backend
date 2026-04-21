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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const database_service_1 = require("../../common/database/database.service");
const user_provisioning_service_1 = require("../../common/user-provisioning/user-provisioning.service");
const ALLOWED_CREATABLE_ROLES = {
    [user_role_enum_1.UserRole.SYSTEM_ADMIN]: [user_role_enum_1.UserRole.RNEC_ADMIN],
    [user_role_enum_1.UserRole.IRB_ADMIN]: [user_role_enum_1.UserRole.REVIEWER, user_role_enum_1.UserRole.FINANCE_OFFICER, user_role_enum_1.UserRole.CHAIRPERSON],
};
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
let UsersService = class UsersService {
    database;
    provisioning;
    constructor(database, provisioning) {
        this.database = database;
        this.provisioning = provisioning;
    }
    async createUser(dto, requestingUser) {
        const permitted = ALLOWED_CREATABLE_ROLES[requestingUser.role];
        if (!permitted || !permitted.includes(dto.role)) {
            throw new common_1.ForbiddenException(`You are not permitted to create a user with role "${dto.role}".`);
        }
        const existing = await this.database.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new common_1.ConflictException('A user with this email already exists.');
        }
        const role = await this.database.role.findUnique({ where: { name: dto.role } });
        if (!role) {
            throw new common_1.BadRequestException(`Role "${dto.role}" has not been seeded.`);
        }
        const tenantId = requestingUser.role === user_role_enum_1.UserRole.IRB_ADMIN
            ? (requestingUser.tenantId ?? null)
            : null;
        return this.provisioning.provision({
            email: dto.email,
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone ?? null,
            roleId: role.id,
            tenantId,
        });
    }
    async findAll(query, requestingUser) {
        const page = Math.max(1, query.page ?? DEFAULT_PAGE);
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, query.pageSize ?? DEFAULT_PAGE_SIZE));
        const tenantFilter = requestingUser.role === user_role_enum_1.UserRole.IRB_ADMIN
            ? (requestingUser.tenantId ?? undefined)
            : (query.tenantId ?? undefined);
        const where = tenantFilter ? { tenantId: tenantFilter } : {};
        const [users, total] = await this.database.$transaction([
            this.database.user.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    phone: true,
                    isActive: true,
                    isVerified: true,
                    lastLoginAt: true,
                    tenantId: true,
                    createdAt: true,
                    updatedAt: true,
                    role: { select: { id: true, name: true } },
                    tenant: { select: { id: true, name: true, code: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.database.user.count({ where }),
        ]);
        return {
            data: users,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async findOne(id) {
        const user = await this.database.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                isActive: true,
                isVerified: true,
                lastLoginAt: true,
                tenantId: true,
                createdAt: true,
                updatedAt: true,
                role: { select: { id: true, name: true } },
                tenant: { select: { id: true, name: true, code: true, type: true } },
                applicantProfile: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id "${id}" not found.`);
        }
        return user;
    }
    async update(id, dto) {
        await this.findOne(id);
        const updated = await this.database.user.update({
            where: { id },
            data: {
                ...(dto.firstName !== undefined && { firstName: dto.firstName }),
                ...(dto.lastName !== undefined && { lastName: dto.lastName }),
                ...(dto.phone !== undefined && { phone: dto.phone }),
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                isActive: true,
                isVerified: true,
                tenantId: true,
                updatedAt: true,
                role: { select: { id: true, name: true } },
            },
        });
        return updated;
    }
    async updateRole(id, dto) {
        await this.findOne(id);
        const role = await this.database.role.findUnique({
            where: { name: dto.role },
        });
        if (!role) {
            throw new common_1.BadRequestException(`Role "${dto.role}" has not been seeded in the database.`);
        }
        const updated = await this.database.user.update({
            where: { id },
            data: { roleId: role.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                updatedAt: true,
                role: { select: { id: true, name: true } },
            },
        });
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        await this.database.user.update({
            where: { id },
            data: { isActive: false },
        });
        return { message: `User "${id}" has been deactivated.` };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        user_provisioning_service_1.UserProvisioningService])
], UsersService);
//# sourceMappingURL=users.service.js.map