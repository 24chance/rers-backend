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
exports.DecisionsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
const certificates_service_1 = require("../certificates/certificates.service");
let DecisionsService = class DecisionsService {
    database;
    certificatesService;
    constructor(database, certificatesService) {
        this.database = database;
        this.certificatesService = certificatesService;
    }
    async record(applicationId, actorId, dto) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, status: true, title: true, applicantId: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        const statusMap = {
            [enums_1.DecisionType.APPROVED]: enums_1.ApplicationStatus.APPROVED,
            [enums_1.DecisionType.CONDITIONALLY_APPROVED]: enums_1.ApplicationStatus.CONDITIONALLY_APPROVED,
            [enums_1.DecisionType.REJECTED]: enums_1.ApplicationStatus.REJECTED,
            [enums_1.DecisionType.DEFERRED]: enums_1.ApplicationStatus.DECISION_PENDING,
        };
        const newStatus = statusMap[dto.type];
        const decision = await this.database.decision.create({
            data: {
                applicationId,
                type: dto.type,
                conditions: dto.conditions,
                rationale: dto.rationale,
                decidedById: actorId,
            },
            include: {
                application: {
                    select: { id: true, referenceNumber: true, title: true },
                },
            },
        });
        await this.database.application.update({
            where: { id: applicationId },
            data: { status: newStatus },
        });
        await this.database.workflowTransition.create({
            data: {
                applicationId,
                fromStatus: application.status,
                toStatus: newStatus,
                actorId,
                reason: `Decision issued: ${dto.type}`,
                notes: dto.rationale,
            },
        });
        await this.database.notification.create({
            data: {
                userId: application.applicantId,
                type: enums_1.NotificationType.DECISION_ISSUED,
                title: 'Decision Issued on Your Application',
                message: `A decision of "${dto.type}" has been issued for your application: ${application.title}`,
                metadata: { applicationId, decisionId: decision.id, type: dto.type },
            },
        });
        if (dto.type === enums_1.DecisionType.APPROVED) {
            await this.certificatesService.generate(applicationId, decision.id);
            await this.database.notification.create({
                data: {
                    userId: application.applicantId,
                    type: enums_1.NotificationType.CERTIFICATE_AVAILABLE,
                    title: 'Ethics Certificate Available',
                    message: `Your ethics certificate for "${application.title}" is now available for download.`,
                    metadata: { applicationId, decisionId: decision.id },
                },
            });
        }
        return decision;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        return this.database.decision.findMany({
            where: { applicationId },
            include: {
                certificate: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const decision = await this.database.decision.findUnique({
            where: { id },
            include: {
                application: {
                    select: { id: true, referenceNumber: true, title: true, status: true },
                },
                certificate: true,
            },
        });
        if (!decision) {
            throw new common_1.NotFoundException(`Decision "${id}" not found.`);
        }
        return decision;
    }
};
exports.DecisionsService = DecisionsService;
exports.DecisionsService = DecisionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        certificates_service_1.CertificatesService])
], DecisionsService);
//# sourceMappingURL=decisions.service.js.map