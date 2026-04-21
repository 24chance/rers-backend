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
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
let MonitoringService = class MonitoringService {
    database;
    constructor(database) {
        this.database = database;
    }
    async ensureApplicationExists(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        return application;
    }
    async createAmendment(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.amendment.create({
            data: {
                applicationId,
                title: dto.title,
                description: dto.description,
                reason: dto.reason,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async createRenewal(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.renewal.create({
            data: {
                applicationId,
                justification: dto.justification,
                extensionPeriod: dto.extensionPeriod,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async createProgressReport(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.progressReport.create({
            data: {
                applicationId,
                reportPeriod: dto.reportPeriod,
                summary: dto.summary,
                participantsEnrolled: dto.participantsEnrolled,
                findings: dto.findings,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async createAdverseEvent(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.adverseEvent.create({
            data: {
                applicationId,
                eventDate: new Date(dto.eventDate),
                description: dto.description,
                severity: dto.severity,
                affectedParticipants: dto.affectedParticipants,
                actionTaken: dto.actionTaken,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async createDeviation(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.protocolDeviation.create({
            data: {
                applicationId,
                deviationDate: new Date(dto.deviationDate),
                description: dto.description,
                impact: dto.impact,
                correctiveAction: dto.correctiveAction,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async createClosureReport(applicationId, userId, dto) {
        await this.ensureApplicationExists(applicationId);
        return this.database.closureReport.create({
            data: {
                applicationId,
                closureDate: new Date(dto.closureDate),
                description: dto.description,
                totalEnrolled: dto.totalEnrolled,
                findings: dto.findings,
                status: enums_1.MonitoringStatus.SUBMITTED,
                submittedAt: new Date(),
            },
        });
    }
    async getByApplication(applicationId, type) {
        await this.ensureApplicationExists(applicationId);
        switch (type) {
            case enums_1.MonitoringType.AMENDMENT:
                return this.database.amendment.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            case enums_1.MonitoringType.RENEWAL:
                return this.database.renewal.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            case enums_1.MonitoringType.PROGRESS_REPORT:
                return this.database.progressReport.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            case enums_1.MonitoringType.ADVERSE_EVENT:
                return this.database.adverseEvent.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            case enums_1.MonitoringType.PROTOCOL_DEVIATION:
                return this.database.protocolDeviation.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            case enums_1.MonitoringType.CLOSURE_REPORT:
                return this.database.closureReport.findMany({
                    where: { applicationId },
                    orderBy: { createdAt: 'desc' },
                });
            default:
                return [];
        }
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map