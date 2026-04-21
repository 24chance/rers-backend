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
exports.InstitutionsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
let InstitutionsService = class InstitutionsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async create(dto) {
        const existing = await this.database.institution.findUnique({
            where: { code: dto.code },
        });
        if (existing) {
            throw new common_1.ConflictException(`An institution with code "${dto.code}" already exists.`);
        }
        const tenant = await this.database.tenant.findUnique({
            where: { id: dto.tenantId },
        });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with id "${dto.tenantId}" not found.`);
        }
        return this.database.institution.create({
            data: {
                name: dto.name,
                code: dto.code,
                type: dto.type,
                tenantId: dto.tenantId,
                address: dto.address,
                phone: dto.phone,
                email: dto.email,
                isActive: dto.isActive ?? true,
            },
            include: { tenant: { select: { id: true, name: true, code: true } } },
        });
    }
    async findAll(tenantId, search) {
        const where = {};
        if (tenantId) {
            where.tenantId = tenantId;
        }
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        return this.database.institution.findMany({
            where,
            include: {
                tenant: { select: { id: true, name: true, code: true } },
                _count: { select: { applications: true } },
            },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const institution = await this.database.institution.findUnique({
            where: { id },
            include: {
                tenant: { select: { id: true, name: true, code: true } },
                _count: { select: { applications: true } },
            },
        });
        if (!institution) {
            throw new common_1.NotFoundException(`Institution with id "${id}" not found.`);
        }
        return institution;
    }
    async findByTenant(tenantId) {
        const tenant = await this.database.tenant.findUnique({
            where: { id: tenantId },
        });
        if (!tenant) {
            throw new common_1.NotFoundException(`Tenant with id "${tenantId}" not found.`);
        }
        return this.database.institution.findMany({
            where: { tenantId },
            include: {
                tenant: { select: { id: true, name: true, code: true } },
                _count: { select: { applications: true } },
            },
            orderBy: { name: 'asc' },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.database.institution.update({
            where: { id },
            data: {
                ...(dto.name !== undefined && { name: dto.name }),
                ...(dto.type !== undefined && { type: dto.type }),
                ...(dto.address !== undefined && { address: dto.address }),
                ...(dto.phone !== undefined && { phone: dto.phone }),
                ...(dto.email !== undefined && { email: dto.email }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
            },
            include: {
                tenant: { select: { id: true, name: true, code: true } },
                _count: { select: { applications: true } },
            },
        });
    }
};
exports.InstitutionsService = InstitutionsService;
exports.InstitutionsService = InstitutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InstitutionsService);
//# sourceMappingURL=institutions.service.js.map