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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
let InvoicesService = class InvoicesService {
    database;
    constructor(database) {
        this.database = database;
    }
    async create(applicationId, dto) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, status: true, title: true, applicantId: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        const invoice = await this.database.invoice.create({
            data: {
                applicationId,
                amount: dto.amount,
                description: dto.description,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                currency: dto.currency ?? 'KES',
            },
            include: {
                application: {
                    select: { id: true, referenceNumber: true, title: true },
                },
            },
        });
        await this.database.application.update({
            where: { id: applicationId },
            data: { status: enums_1.ApplicationStatus.PAYMENT_PENDING },
        });
        await this.database.workflowTransition.create({
            data: {
                applicationId,
                fromStatus: application.status,
                toStatus: enums_1.ApplicationStatus.PAYMENT_PENDING,
                reason: 'Invoice created — payment required',
            },
        });
        await this.database.notification.create({
            data: {
                userId: application.applicantId,
                type: enums_1.NotificationType.PAYMENT_PENDING,
                title: 'Payment Required',
                message: `An invoice of ${dto.currency ?? 'KES'} ${dto.amount} has been issued for your application: ${application.title}`,
                metadata: { applicationId, invoiceId: invoice.id },
            },
        });
        return invoice;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        return this.database.invoice.findMany({
            where: { applicationId },
            include: {
                payments: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                        method: true,
                        referenceNumber: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAll(tenantId, filters) {
        const where = {};
        if (tenantId) {
            where.application = { tenantId };
        }
        if (filters?.status) {
            where.status = filters.status;
        }
        return this.database.invoice.findMany({
            where,
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        tenantId: true,
                    },
                },
                payments: {
                    select: { id: true, amount: true, status: true, createdAt: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map