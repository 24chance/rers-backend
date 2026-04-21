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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const database_service_1 = require("../../common/database/database.service");
let CertificatesService = class CertificatesService {
    database;
    constructor(database) {
        this.database = database;
    }
    async generate(applicationId, decisionId) {
        const existing = await this.database.certificate.findUnique({
            where: { decisionId },
        });
        if (existing) {
            return existing;
        }
        const certificateNumber = await this.generateCertificateNumber();
        const verificationToken = (0, uuid_1.v4)();
        const issuedAt = new Date();
        const expiresAt = new Date(issuedAt);
        expiresAt.setFullYear(expiresAt.getFullYear() + 2);
        return this.database.certificate.create({
            data: {
                applicationId,
                decisionId,
                certificateNumber,
                verificationToken,
                issuedAt,
                expiresAt,
            },
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        type: true,
                    },
                },
                decision: {
                    select: { id: true, type: true, createdAt: true },
                },
            },
        });
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application "${applicationId}" not found.`);
        }
        const certificate = await this.database.certificate.findFirst({
            where: { applicationId },
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        type: true,
                    },
                },
                decision: {
                    select: { id: true, type: true, createdAt: true },
                },
            },
        });
        if (!certificate) {
            throw new common_1.NotFoundException(`No certificate found for application "${applicationId}".`);
        }
        return certificate;
    }
    async verify(token) {
        const certificate = await this.database.certificate.findUnique({
            where: { verificationToken: token },
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        type: true,
                        applicant: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                        destination: {
                            select: { id: true, name: true },
                        },
                    },
                },
                decision: {
                    select: { id: true, type: true, createdAt: true },
                },
            },
        });
        if (!certificate) {
            throw new common_1.NotFoundException('Certificate not found for the provided verification token.');
        }
        return {
            valid: true,
            certificate: {
                certificateNumber: certificate.certificateNumber,
                issuedAt: certificate.issuedAt,
                expiresAt: certificate.expiresAt,
            },
            application: {
                referenceNumber: certificate.application.referenceNumber,
                title: certificate.application.title,
                type: certificate.application.type,
                institution: certificate.application.destination?.name ?? null,
                principalInvestigator: `${certificate.application.applicant.firstName} ${certificate.application.applicant.lastName}`,
            },
            decision: {
                type: certificate.decision.type,
                issuedAt: certificate.decision.createdAt,
            },
        };
    }
    async download(applicationId, userId) {
        const certificate = await this.database.certificate.findFirst({
            where: { applicationId },
            include: {
                application: {
                    select: {
                        id: true,
                        referenceNumber: true,
                        title: true,
                        applicantId: true,
                    },
                },
            },
        });
        if (!certificate) {
            throw new common_1.NotFoundException(`No certificate found for application "${applicationId}".`);
        }
        return {
            certificateNumber: certificate.certificateNumber,
            pdfPath: certificate.pdfPath,
            issuedAt: certificate.issuedAt,
            expiresAt: certificate.expiresAt,
            verificationToken: certificate.verificationToken,
        };
    }
    async generateCertificateNumber() {
        const year = new Date().getFullYear();
        const prefix = `CERT-${year}-`;
        const count = await this.database.certificate.count({
            where: { certificateNumber: { startsWith: prefix } },
        });
        const sequence = String(count + 1).padStart(4, '0');
        return `${prefix}${sequence}`;
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map