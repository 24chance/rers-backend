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
exports.TenantsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const user_provisioning_service_1 = require("../../common/user-provisioning/user-provisioning.service");
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
let TenantsService = class TenantsService {
    database;
    provisioning;
    constructor(database, provisioning) {
        this.database = database;
        this.provisioning = provisioning;
    }
    async create(dto) {
        const existing = await this.database.tenant.findUnique({
            where: { code: dto.code },
        });
        if (existing) {
            throw new common_1.ConflictException(`A tenant with code "${dto.code}" already exists.`);
        }
        const existingAdminUser = await this.database.user.findUnique({
            where: { email: dto.admin.email },
        });
        if (existingAdminUser) {
            throw new common_1.ConflictException(`A user with email "${dto.admin.email}" already exists.`);
        }
        const irbAdminRole = await this.database.role.findUnique({
            where: { name: user_role_enum_1.UserRole.IRB_ADMIN },
        });
        if (!irbAdminRole) {
            throw new common_1.BadRequestException('IRB_ADMIN role has not been seeded. Run /bootstrap/seed first.');
        }
        const tenant = await this.database.tenant.create({
            data: {
                name: dto.name,
                code: dto.code,
                type: dto.type,
                logoUrl: dto.logoUrl,
                address: dto.address,
                phone: dto.phone,
                email: dto.email,
                isActive: dto.isActive ?? true,
                settings: dto.settings ?? undefined,
            },
        });
        await this.provisioning.provision({
            email: dto.admin.email,
            firstName: dto.admin.firstName,
            lastName: dto.admin.lastName,
            phone: dto.admin.phone ?? null,
            roleId: irbAdminRole.id,
            tenantId: tenant.id,
        });
        return tenant;
    }
    async findAll(query) {
        const page = Math.max(1, parseInt(query.page ?? '1', 10) || DEFAULT_PAGE);
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(query.pageSize ?? '20', 10) || DEFAULT_PAGE_SIZE));
        const where = {};
        if (query.isActive !== undefined) {
            where.isActive = query.isActive === 'true';
        }
        if (query.type) {
            where.type = query.type;
        }
        if (query.search) {
            where.name = { contains: query.search, mode: 'insensitive' };
        }
        const [tenants, total] = await this.database.$transaction([
            this.database.tenant.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: {
                        select: { users: true, applications: true, institutions: true },
                    },
                },
            }),
            this.database.tenant.count({ where }),
        ]);
        return {
            data: tenants,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async findOne(id) {
        const tenant = await this.database.tenant.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { users: true, applications: true, institutions: true },
                },
            },
        });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with id "${id}" not found.`);
        }
        return tenant;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.database.tenant.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.type !== undefined && { type: dto.type }),
                ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
                ...(dto.address !== undefined && { address: dto.address }),
                ...(dto.phone !== undefined && { phone: dto.phone }),
                ...(dto.email !== undefined && { email: dto.email }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.settings !== undefined && { settings: dto.settings }),
            },
            include: {
                _count: {
                    select: { users: true, applications: true, institutions: true },
                },
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.database.tenant.update({
            where: { id },
            data: { isActive: false },
        });
        return { message: `Tenant "${id}" has been deactivated.` };
    }
    async getTenantStats(id) {
        await this.findOne(id);
        const [totalUsers, totalApplications, totalInstitutions, applicationsByStatus,] = await this.database.$transaction([
            this.database.user.count({ where: { tenantId: id } }),
            this.database.application.count({ where: { tenantId: id } }),
            this.database.institution.count({ where: { tenantId: id } }),
            this.database.application.groupBy({
                by: ['status'],
                where: { tenantId: id },
                _count: { status: true },
            }),
        ]);
        return {
            tenantId: id,
            totalUsers,
            totalApplications,
            totalInstitutions,
            applicationsByStatus: applicationsByStatus.map((s) => ({
                status: s.status,
                count: s._count.status,
            })),
        };
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        user_provisioning_service_1.UserProvisioningService])
], TenantsService);
//# sourceMappingURL=tenants.service.js.map