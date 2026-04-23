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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const database_service_1 = require("../../common/database/database.service");
const workflows_service_1 = require("../workflows/workflows.service");
const screen_application_dto_1 = require("./dto/screen-application.dto");
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
const EDITABLE_STATUSES = new Set([
    enums_1.ApplicationStatus.DRAFT,
    enums_1.ApplicationStatus.QUERY_RAISED,
]);
const TENANT_SCOPED_ROLES = new Set([
    user_role_enum_1.UserRole.IRB_ADMIN,
    user_role_enum_1.UserRole.CHAIRPERSON,
    user_role_enum_1.UserRole.FINANCE_OFFICER,
]);
let ApplicationsService = class ApplicationsService {
    database;
    workflowsService;
    constructor(database, workflowsService) {
        this.database = database;
        this.workflowsService = workflowsService;
    }
    async generateReferenceNumber() {
        const year = new Date().getFullYear();
        const prefix = `RNEC-${year}-`;
        const count = await this.database.application.count({
            where: { referenceNumber: { startsWith: prefix } },
        });
        const sequence = String(count + 1).padStart(4, '0');
        return `${prefix}${sequence}`;
    }
    async create(userId, userTenantId, dto) {
        const application = await this.database.application.create({
            data: {
                title: dto.title,
                type: dto.type,
                status: enums_1.ApplicationStatus.DRAFT,
                tenantId: dto.tenantId ?? userTenantId,
                applicantId: userId,
                destinationId: dto.destinationId,
                principalInvestigator: dto.principalInvestigator,
                coInvestigators: dto.coInvestigators ?? [],
                studyDuration: dto.studyDuration,
                studyStartDate: dto.studyStartDate ? new Date(dto.studyStartDate) : undefined,
                studyEndDate: dto.studyEndDate ? new Date(dto.studyEndDate) : undefined,
                population: dto.population,
                sampleSize: dto.sampleSize,
                methodology: dto.methodology,
                fundingSource: dto.fundingSource,
                budget: dto.budget,
                ethicsStatement: dto.ethicsStatement,
                consentDescription: dto.consentDescription,
                formData: dto.formData ?? undefined,
            },
            include: this.defaultInclude(),
        });
        await this.database.workflowTransition.create({
            data: {
                applicationId: application.id,
                fromStatus: undefined,
                toStatus: enums_1.ApplicationStatus.DRAFT,
                actorId: userId,
                reason: 'Application created',
            },
        });
        return application;
    }
    async findAll(userId, role, userTenantId, filters) {
        const page = Math.max(1, parseInt(filters.page ?? '1', 10) || DEFAULT_PAGE);
        const requestedPageSize = filters.pageSize ?? filters.limit ?? '20';
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, parseInt(requestedPageSize, 10) || DEFAULT_PAGE_SIZE));
        const where = {};
        if (role === user_role_enum_1.UserRole.APPLICANT) {
            where.applicantId = userId;
        }
        else if (TENANT_SCOPED_ROLES.has(role)) {
            where.tenantId = userTenantId ?? undefined;
        }
        if (filters.status) {
            where.status = filters.status;
        }
        if (filters.type) {
            where.type = filters.type;
        }
        if (filters.tenantId &&
            (role === user_role_enum_1.UserRole.RNEC_ADMIN || role === user_role_enum_1.UserRole.SYSTEM_ADMIN)) {
            where.tenantId = filters.tenantId;
        }
        if (filters.applicantId) {
            where.applicantId = filters.applicantId;
        }
        if (filters.search) {
            where.title = { contains: filters.search, mode: 'insensitive' };
        }
        const [applications, total] = await this.database.$transaction([
            this.database.application.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: this.defaultInclude(),
            }),
            this.database.application.count({ where }),
        ]);
        return {
            data: applications,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async findOne(id, userId, role) {
        const application = await this.database.application.findUnique({
            where: { id },
            include: {
                ...this.defaultInclude(),
                documents: true,
                workflowTransitions: { orderBy: { createdAt: 'asc' } },
                queries: {
                    include: { responses: { orderBy: { createdAt: 'asc' } } },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        if (role === user_role_enum_1.UserRole.APPLICANT &&
            application.applicantId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this application.');
        }
        if (role === user_role_enum_1.UserRole.REVIEWER) {
            const hasAccess = await Promise.all([
                this.database.reviewAssignment.findFirst({
                    where: {
                        applicationId: id,
                        reviewerId: userId,
                    },
                }),
                this.database.review.findFirst({
                    where: {
                        applicationId: id,
                        reviewerId: userId,
                    },
                }),
            ]);
            if (!hasAccess.some(Boolean)) {
                throw new common_1.ForbiddenException('You do not have access to applications that are not assigned to you.');
            }
        }
        if (TENANT_SCOPED_ROLES.has(role)) {
            const user = await this.database.user.findUnique({
                where: { id: userId },
                select: { tenantId: true },
            });
            if (application.tenantId !== user?.tenantId) {
                throw new common_1.ForbiddenException('You do not have access to applications outside your tenant.');
            }
        }
        return application;
    }
    async update(id, userId, dto) {
        const application = await this.database.application.findUnique({
            where: { id },
            select: { id: true, status: true, applicantId: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        if (!EDITABLE_STATUSES.has(application.status)) {
            throw new common_1.BadRequestException(`Only ${Array.from(EDITABLE_STATUSES).join(' or ')} applications can be edited. Current status: "${application.status}".`);
        }
        if (application.applicantId !== userId) {
            throw new common_1.ForbiddenException('You can only edit your own applications.');
        }
        return this.database.application.update({
            where: { id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.type !== undefined && { type: dto.type }),
                ...(dto.tenantId !== undefined && { tenantId: dto.tenantId }),
                ...(dto.destinationId !== undefined && { destinationId: dto.destinationId }),
                ...(dto.principalInvestigator !== undefined && {
                    principalInvestigator: dto.principalInvestigator,
                }),
                ...(dto.coInvestigators !== undefined && {
                    coInvestigators: dto.coInvestigators,
                }),
                ...(dto.studyDuration !== undefined && { studyDuration: dto.studyDuration }),
                ...(dto.studyStartDate !== undefined && {
                    studyStartDate: new Date(dto.studyStartDate),
                }),
                ...(dto.studyEndDate !== undefined && {
                    studyEndDate: new Date(dto.studyEndDate),
                }),
                ...(dto.population !== undefined && { population: dto.population }),
                ...(dto.sampleSize !== undefined && { sampleSize: dto.sampleSize }),
                ...(dto.methodology !== undefined && { methodology: dto.methodology }),
                ...(dto.fundingSource !== undefined && { fundingSource: dto.fundingSource }),
                ...(dto.budget !== undefined && { budget: dto.budget }),
                ...(dto.ethicsStatement !== undefined && {
                    ethicsStatement: dto.ethicsStatement,
                }),
                ...(dto.consentDescription !== undefined && {
                    consentDescription: dto.consentDescription,
                }),
                ...(dto.formData !== undefined && { formData: dto.formData }),
            },
            include: this.defaultInclude(),
        });
    }
    async submit(id, userId) {
        const application = await this.database.application.findUnique({
            where: { id },
            include: { documents: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        if (application.status !== enums_1.ApplicationStatus.DRAFT) {
            throw new common_1.BadRequestException(`Only DRAFT applications can be submitted. Current status: "${application.status}".`);
        }
        if (application.applicantId !== userId) {
            throw new common_1.ForbiddenException('You can only submit your own applications.');
        }
        this.workflowsService.validateTransition(enums_1.ApplicationStatus.DRAFT, enums_1.ApplicationStatus.SUBMITTED);
        const referenceNumber = await this.generateReferenceNumber();
        const updated = await this.database.application.update({
            where: { id },
            data: {
                status: enums_1.ApplicationStatus.SUBMITTED,
                referenceNumber,
                submittedAt: new Date(),
            },
            include: this.defaultInclude(),
        });
        await this.workflowsService.recordTransition(id, enums_1.ApplicationStatus.DRAFT, enums_1.ApplicationStatus.SUBMITTED, userId, 'Application submitted by applicant');
        return updated;
    }
    async screen(id, adminId, dto) {
        const application = await this.database.application.findUnique({
            where: { id },
            select: { id: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        if (application.status !== enums_1.ApplicationStatus.SCREENING) {
            throw new common_1.BadRequestException(`Application must be in SCREENING status to be screened. Current: "${application.status}".`);
        }
        let toStatus;
        switch (dto.action) {
            case screen_application_dto_1.ScreeningAction.PASS:
                toStatus = enums_1.ApplicationStatus.UNDER_REVIEW;
                break;
            case screen_application_dto_1.ScreeningAction.RAISE_QUERY:
                toStatus = enums_1.ApplicationStatus.QUERY_RAISED;
                break;
            case screen_application_dto_1.ScreeningAction.REQUEST_PAYMENT:
                toStatus = enums_1.ApplicationStatus.PAYMENT_PENDING;
                break;
            default:
                throw new common_1.BadRequestException(`Unknown screening action: "${dto.action}".`);
        }
        this.workflowsService.validateTransition(enums_1.ApplicationStatus.SCREENING, toStatus);
        const updated = await this.database.application.update({
            where: { id },
            data: { status: toStatus },
            include: this.defaultInclude(),
        });
        await this.workflowsService.recordTransition(id, enums_1.ApplicationStatus.SCREENING, toStatus, adminId, dto.reason);
        if (dto.action === screen_application_dto_1.ScreeningAction.RAISE_QUERY && dto.reason) {
            await this.database.query.create({
                data: {
                    applicationId: id,
                    raisedById: adminId,
                    question: dto.reason,
                },
            });
        }
        return updated;
    }
    async advanceStatus(id, actorId, dto) {
        const application = await this.database.application.findUnique({
            where: { id },
            select: { id: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        this.workflowsService.validateTransition(application.status, dto.toStatus);
        const updated = await this.database.application.update({
            where: { id },
            data: { status: dto.toStatus },
            include: this.defaultInclude(),
        });
        await this.workflowsService.recordTransition(id, application.status, dto.toStatus, actorId, dto.reason, dto.notes);
        return updated;
    }
    async remove(id, userId) {
        const application = await this.database.application.findUnique({
            where: { id },
            select: { id: true, status: true, applicantId: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${id}" not found.`);
        }
        if (application.applicantId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own applications.');
        }
        if (application.status !== enums_1.ApplicationStatus.DRAFT) {
            throw new common_1.BadRequestException(`Only DRAFT applications can be deleted. Current status: "${application.status}".`);
        }
        await this.database.applicationDocument.deleteMany({ where: { applicationId: id } });
        await this.database.workflowTransition.deleteMany({ where: { applicationId: id } });
        await this.database.application.delete({ where: { id } });
    }
    async getTimeline(id) {
        return this.workflowsService.getTimeline(id);
    }
    defaultInclude() {
        return {
            tenant: { select: { id: true, name: true, code: true } },
            applicant: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                },
            },
            destination: { select: { id: true, name: true, code: true } },
            _count: {
                select: {
                    documents: true,
                    queries: true,
                    reviewAssignments: true,
                },
            },
        };
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        workflows_service_1.WorkflowsService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map