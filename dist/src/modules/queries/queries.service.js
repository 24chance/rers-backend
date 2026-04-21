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
exports.QueriesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
let QueriesService = class QueriesService {
    database;
    constructor(database) {
        this.database = database;
    }
    async raiseQuery(applicationId, adminId, dto) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${applicationId}" not found.`);
        }
        const query = await this.database.query.create({
            data: {
                applicationId,
                raisedById: adminId,
                question: dto.question,
            },
            include: { responses: true },
        });
        if (application.status !== enums_1.ApplicationStatus.QUERY_RAISED) {
            await this.database.application.update({
                where: { id: applicationId },
                data: { status: enums_1.ApplicationStatus.QUERY_RAISED },
            });
            await this.database.workflowTransition.create({
                data: {
                    applicationId,
                    fromStatus: application.status,
                    toStatus: enums_1.ApplicationStatus.QUERY_RAISED,
                    actorId: adminId,
                    reason: 'Query raised by admin',
                },
            });
        }
        return query;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${applicationId}" not found.`);
        }
        return this.database.query.findMany({
            where: { applicationId },
            include: {
                responses: { orderBy: { createdAt: 'asc' } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async respondToQuery(applicationId, queryId, userId, dto) {
        const query = await this.database.query.findFirst({
            where: { id: queryId, applicationId },
        });
        if (!query) {
            throw new common_1.NotFoundException(`Query with id "${queryId}" not found on application "${applicationId}".`);
        }
        if (query.isResolved) {
            throw new common_1.BadRequestException(`Query "${queryId}" is already resolved and cannot receive new responses.`);
        }
        const response = await this.database.queryResponse.create({
            data: {
                queryId,
                responderId: userId,
                response: dto.response,
            },
        });
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { status: true },
        });
        if (application && application.status === enums_1.ApplicationStatus.QUERY_RAISED) {
            await this.database.application.update({
                where: { id: applicationId },
                data: { status: enums_1.ApplicationStatus.RESPONSE_RECEIVED },
            });
            await this.database.workflowTransition.create({
                data: {
                    applicationId,
                    fromStatus: enums_1.ApplicationStatus.QUERY_RAISED,
                    toStatus: enums_1.ApplicationStatus.RESPONSE_RECEIVED,
                    actorId: userId,
                    reason: 'Response submitted by applicant',
                },
            });
        }
        return response;
    }
    async resolveQuery(applicationId, queryId) {
        const query = await this.database.query.findFirst({
            where: { id: queryId, applicationId },
        });
        if (!query) {
            throw new common_1.NotFoundException(`Query with id "${queryId}" not found on application "${applicationId}".`);
        }
        if (query.isResolved) {
            throw new common_1.BadRequestException(`Query "${queryId}" is already resolved.`);
        }
        return this.database.query.update({
            where: { id: queryId },
            data: { isResolved: true, resolvedAt: new Date() },
            include: { responses: { orderBy: { createdAt: 'asc' } } },
        });
    }
};
exports.QueriesService = QueriesService;
exports.QueriesService = QueriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], QueriesService);
//# sourceMappingURL=queries.service.js.map