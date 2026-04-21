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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;
let AuditLogsService = class AuditLogsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async log(dto) {
        return this.database.auditLog.create({
            data: {
                actorId: dto.actorId,
                action: dto.action,
                targetEntity: dto.targetEntity,
                targetId: dto.targetId,
                tenantId: dto.tenantId,
                metadata: dto.metadata ?? undefined,
                ipAddress: dto.ipAddress,
            },
        });
    }
    async findAll(filters) {
        const page = Math.max(1, parseInt(filters.page ?? '1', 10) || DEFAULT_PAGE);
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(filters.pageSize ?? '50', 10) || DEFAULT_PAGE_SIZE));
        const where = {};
        if (filters.actorId) {
            where.actorId = filters.actorId;
        }
        if (filters.action) {
            where.action = { contains: filters.action, mode: 'insensitive' };
        }
        if (filters.targetEntity) {
            where.targetEntity = { contains: filters.targetEntity, mode: 'insensitive' };
        }
        if (filters.tenantId) {
            where.tenantId = filters.tenantId;
        }
        if (filters.dateFrom || filters.dateTo) {
            where.createdAt = {};
            if (filters.dateFrom) {
                where.createdAt.gte = new Date(filters.dateFrom);
            }
            if (filters.dateTo) {
                where.createdAt.lte = new Date(filters.dateTo);
            }
        }
        const [logs, total] = await this.database.$transaction([
            this.database.auditLog.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: {
                    actor: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    tenant: {
                        select: { id: true, name: true, code: true },
                    },
                },
            }),
            this.database.auditLog.count({ where }),
        ]);
        return {
            data: logs,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map