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
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const database_service_1 = require("../../common/database/database.service");
const ALLOWED_TRANSITIONS = {
    [enums_1.ApplicationStatus.DRAFT]: [enums_1.ApplicationStatus.SUBMITTED],
    [enums_1.ApplicationStatus.SUBMITTED]: [enums_1.ApplicationStatus.SCREENING],
    [enums_1.ApplicationStatus.SCREENING]: [
        enums_1.ApplicationStatus.PAYMENT_PENDING,
        enums_1.ApplicationStatus.QUERY_RAISED,
        enums_1.ApplicationStatus.UNDER_REVIEW,
    ],
    [enums_1.ApplicationStatus.PAYMENT_PENDING]: [enums_1.ApplicationStatus.PAYMENT_VERIFIED],
    [enums_1.ApplicationStatus.PAYMENT_VERIFIED]: [enums_1.ApplicationStatus.UNDER_REVIEW],
    [enums_1.ApplicationStatus.QUERY_RAISED]: [enums_1.ApplicationStatus.RESPONSE_RECEIVED],
    [enums_1.ApplicationStatus.RESPONSE_RECEIVED]: [
        enums_1.ApplicationStatus.UNDER_REVIEW,
        enums_1.ApplicationStatus.SCREENING,
    ],
    [enums_1.ApplicationStatus.UNDER_REVIEW]: [
        enums_1.ApplicationStatus.DECISION_PENDING,
        enums_1.ApplicationStatus.QUERY_RAISED,
    ],
    [enums_1.ApplicationStatus.DECISION_PENDING]: [
        enums_1.ApplicationStatus.APPROVED,
        enums_1.ApplicationStatus.CONDITIONALLY_APPROVED,
        enums_1.ApplicationStatus.REJECTED,
    ],
    [enums_1.ApplicationStatus.APPROVED]: [
        enums_1.ApplicationStatus.MONITORING_ACTIVE,
        enums_1.ApplicationStatus.CLOSED,
        enums_1.ApplicationStatus.AMENDMENT_PENDING,
    ],
    [enums_1.ApplicationStatus.CONDITIONALLY_APPROVED]: [
        enums_1.ApplicationStatus.MONITORING_ACTIVE,
        enums_1.ApplicationStatus.AMENDMENT_PENDING,
    ],
    [enums_1.ApplicationStatus.AMENDMENT_PENDING]: [enums_1.ApplicationStatus.UNDER_REVIEW],
    [enums_1.ApplicationStatus.MONITORING_ACTIVE]: [enums_1.ApplicationStatus.CLOSED],
};
let WorkflowsService = class WorkflowsService {
    database;
    constructor(database) {
        this.database = database;
    }
    validateTransition(from, to) {
        if (from === null) {
            if (to !== enums_1.ApplicationStatus.DRAFT) {
                throw new common_1.BadRequestException(`Initial status must be DRAFT, not "${to}".`);
            }
            return;
        }
        const allowed = ALLOWED_TRANSITIONS[from] ?? [];
        if (!allowed.includes(to)) {
            throw new common_1.BadRequestException(`Transition from "${from}" to "${to}" is not allowed. Allowed: [${allowed.join(', ')}].`);
        }
    }
    async recordTransition(applicationId, from, to, actorId, reason, notes) {
        this.validateTransition(from, to);
        return this.database.workflowTransition.create({
            data: {
                applicationId,
                fromStatus: from ?? undefined,
                toStatus: to,
                actorId: actorId ?? undefined,
                reason,
                notes,
            },
        });
    }
    async getTimeline(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, referenceNumber: true, status: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${applicationId}" not found.`);
        }
        const transitions = await this.database.workflowTransition.findMany({
            where: { applicationId },
            orderBy: { createdAt: 'asc' },
            include: {
                application: {
                    select: { id: true, referenceNumber: true },
                },
            },
        });
        return {
            application,
            timeline: transitions,
        };
    }
    getAllowedTransitions(from) {
        return ALLOWED_TRANSITIONS[from] ?? [];
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map