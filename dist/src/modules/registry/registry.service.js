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
exports.RegistryService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
const certificates_service_1 = require("../certificates/certificates.service");
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
let RegistryService = class RegistryService {
    database;
    certificatesService;
    constructor(database, certificatesService) {
        this.database = database;
        this.certificatesService = certificatesService;
    }
    async findAll(filters) {
        const page = Math.max(1, parseInt(filters?.page ?? '1', 10) || DEFAULT_PAGE);
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(filters?.pageSize ?? '20', 10) || DEFAULT_PAGE_SIZE));
        const where = {
            status: enums_1.ApplicationStatus.APPROVED,
        };
        if (filters?.type) {
            where.type = filters.type;
        }
        if (filters?.search) {
            where.title = { contains: filters.search, mode: 'insensitive' };
        }
        const [applications, total] = await this.database.$transaction([
            this.database.application.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { submittedAt: 'desc' },
                select: {
                    id: true,
                    referenceNumber: true,
                    title: true,
                    type: true,
                    submittedAt: true,
                    destination: { select: { id: true, name: true } },
                    certificates: {
                        select: {
                            certificateNumber: true,
                            issuedAt: true,
                            expiresAt: true,
                        },
                    },
                },
            }),
            this.database.application.count({ where }),
        ]);
        const data = applications.map((app) => ({
            id: app.id,
            referenceNumber: app.referenceNumber,
            title: app.title,
            type: app.type,
            institution: app.destination?.name ?? null,
            approvedDate: app.certificates[0]?.issuedAt ?? null,
            expiresAt: app.certificates[0]?.expiresAt ?? null,
            certificateNumber: app.certificates[0]?.certificateNumber ?? null,
        }));
        return {
            data,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async findOne(id) {
        const application = await this.database.application.findFirst({
            where: { id, status: enums_1.ApplicationStatus.APPROVED },
            select: {
                id: true,
                referenceNumber: true,
                title: true,
                type: true,
                principalInvestigator: true,
                studyDuration: true,
                studyStartDate: true,
                studyEndDate: true,
                methodology: true,
                submittedAt: true,
                destination: { select: { id: true, name: true } },
                certificates: {
                    select: {
                        certificateNumber: true,
                        issuedAt: true,
                        expiresAt: true,
                        verificationToken: true,
                    },
                },
                decisions: {
                    select: { id: true, type: true, createdAt: true },
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                },
            },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Approved study with id "${id}" not found in registry.`);
        }
        return {
            id: application.id,
            referenceNumber: application.referenceNumber,
            title: application.title,
            type: application.type,
            principalInvestigator: application.principalInvestigator,
            methodology: application.methodology,
            studyDuration: application.studyDuration,
            studyStartDate: application.studyStartDate,
            studyEndDate: application.studyEndDate,
            institution: application.destination?.name ?? null,
            approvedDate: application.certificates[0]?.issuedAt ?? null,
            expiresAt: application.certificates[0]?.expiresAt ?? null,
            certificateNumber: application.certificates[0]?.certificateNumber ?? null,
            verificationToken: application.certificates[0]?.verificationToken ?? null,
        };
    }
    async verifyCertificate(token) {
        return this.certificatesService.verify(token);
    }
};
exports.RegistryService = RegistryService;
exports.RegistryService = RegistryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        certificates_service_1.CertificatesService])
], RegistryService);
//# sourceMappingURL=registry.service.js.map