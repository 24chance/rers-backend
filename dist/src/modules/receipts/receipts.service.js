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
exports.ReceiptsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
let ReceiptsService = class ReceiptsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async create(paymentId, amount) {
        const receiptNumber = await this.generateReceiptNumber();
        return this.database.receipt.create({
            data: {
                paymentId,
                receiptNumber,
                amount,
                issuedAt: new Date(),
            },
            include: {
                payment: {
                    select: {
                        id: true,
                        invoiceId: true,
                        amount: true,
                        method: true,
                        referenceNumber: true,
                    },
                },
            },
        });
    }
    async findByPayment(paymentId) {
        const payment = await this.database.payment.findUnique({
            where: { id: paymentId },
            select: { id: true },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment "${paymentId}" not found.`);
        }
        return this.database.receipt.findFirst({
            where: { paymentId },
            include: {
                payment: {
                    select: {
                        id: true,
                        invoiceId: true,
                        amount: true,
                        method: true,
                        referenceNumber: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const receipt = await this.database.receipt.findUnique({
            where: { id },
            include: {
                payment: {
                    select: {
                        id: true,
                        invoiceId: true,
                        amount: true,
                        method: true,
                        referenceNumber: true,
                        invoice: {
                            select: {
                                id: true,
                                applicationId: true,
                                amount: true,
                                currency: true,
                            },
                        },
                    },
                },
            },
        });
        if (!receipt) {
            throw new common_1.NotFoundException(`Receipt "${id}" not found.`);
        }
        return receipt;
    }
    async findAll(tenantId, filters) {
        const where = {};
        if (filters?.paymentId) {
            where.paymentId = filters.paymentId;
        }
        if (tenantId) {
            where.payment = {
                invoice: {
                    application: { tenantId },
                },
            };
        }
        return this.database.receipt.findMany({
            where,
            include: {
                payment: {
                    select: {
                        id: true,
                        invoiceId: true,
                        amount: true,
                        method: true,
                        referenceNumber: true,
                        invoice: {
                            select: {
                                id: true,
                                amount: true,
                                currency: true,
                                application: {
                                    select: {
                                        id: true,
                                        referenceNumber: true,
                                        title: true,
                                        applicant: {
                                            select: {
                                                firstName: true,
                                                lastName: true,
                                                email: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: { issuedAt: 'desc' },
        });
    }
    async generateReceiptNumber() {
        const year = new Date().getFullYear();
        const prefix = `RCPT-${year}-`;
        const count = await this.database.receipt.count({
            where: { receiptNumber: { startsWith: prefix } },
        });
        const sequence = String(count + 1).padStart(4, '0');
        return `${prefix}${sequence}`;
    }
};
exports.ReceiptsService = ReceiptsService;
exports.ReceiptsService = ReceiptsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ReceiptsService);
//# sourceMappingURL=receipts.service.js.map