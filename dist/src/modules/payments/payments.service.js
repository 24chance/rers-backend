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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
const receipts_service_1 = require("../receipts/receipts.service");
let PaymentsService = class PaymentsService {
    database;
    receiptsService;
    constructor(database, receiptsService) {
        this.database = database;
        this.receiptsService = receiptsService;
    }
    async create(invoiceId, dto) {
        const invoice = await this.database.invoice.findUnique({
            where: { id: invoiceId },
            select: { id: true, status: true, applicationId: true, amount: true },
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice "${invoiceId}" not found.`);
        }
        if (invoice.status === enums_1.PaymentStatus.VERIFIED) {
            throw new common_1.BadRequestException('This invoice has already been paid and verified.');
        }
        return this.database.payment.create({
            data: {
                invoiceId,
                amount: dto.amount,
                method: dto.method,
                referenceNumber: dto.referenceNumber,
                notes: dto.notes,
                status: enums_1.PaymentStatus.PENDING,
            },
            include: {
                invoice: {
                    select: { id: true, applicationId: true, amount: true, currency: true },
                },
            },
        });
    }
    async verify(paymentId, officerId, dto) {
        const payment = await this.database.payment.findUnique({
            where: { id: paymentId },
            include: {
                invoice: {
                    select: {
                        id: true,
                        applicationId: true,
                        application: {
                            select: {
                                id: true,
                                status: true,
                                applicantId: true,
                                title: true,
                            },
                        },
                    },
                },
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment "${paymentId}" not found.`);
        }
        if (payment.status === enums_1.PaymentStatus.VERIFIED) {
            throw new common_1.BadRequestException('Payment has already been verified.');
        }
        const updatedPayment = await this.database.payment.update({
            where: { id: paymentId },
            data: {
                status: enums_1.PaymentStatus.VERIFIED,
                verifiedById: officerId,
                verifiedAt: new Date(),
                notes: dto.notes ?? payment.notes,
            },
        });
        await this.database.invoice.update({
            where: { id: payment.invoiceId },
            data: { status: enums_1.PaymentStatus.VERIFIED },
        });
        const application = payment.invoice.application;
        await this.database.application.update({
            where: { id: application.id },
            data: { status: enums_1.ApplicationStatus.PAYMENT_VERIFIED },
        });
        await this.database.workflowTransition.create({
            data: {
                applicationId: application.id,
                fromStatus: application.status,
                toStatus: enums_1.ApplicationStatus.PAYMENT_VERIFIED,
                actorId: officerId,
                reason: 'Payment verified by finance officer',
            },
        });
        await this.database.notification.create({
            data: {
                userId: application.applicantId,
                type: enums_1.NotificationType.PAYMENT_VERIFIED,
                title: 'Payment Verified',
                message: `Your payment for application "${application.title}" has been verified.`,
                metadata: { applicationId: application.id, paymentId },
            },
        });
        await this.receiptsService.create(paymentId, Number(payment.amount));
        return updatedPayment;
    }
    async findByInvoice(invoiceId) {
        const invoice = await this.database.invoice.findUnique({
            where: { id: invoiceId },
            select: { id: true },
        });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice "${invoiceId}" not found.`);
        }
        return this.database.payment.findMany({
            where: { invoiceId },
            include: {
                receipts: { select: { id: true, receiptNumber: true, issuedAt: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        receipts_service_1.ReceiptsService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map