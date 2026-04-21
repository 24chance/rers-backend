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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const decisions_service_1 = require("./decisions.service");
const create_decision_dto_1 = require("./dto/create-decision.dto");
let DecisionsController = class DecisionsController {
    decisionsService;
    constructor(decisionsService) {
        this.decisionsService = decisionsService;
    }
    record(applicationId, dto, user) {
        return this.decisionsService.record(applicationId, user.id, dto);
    }
    findByApplication(applicationId) {
        return this.decisionsService.findByApplication(applicationId);
    }
    findOne(id) {
        return this.decisionsService.findOne(id);
    }
};
exports.DecisionsController = DecisionsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CHAIRPERSON, user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)('application/:applicationId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Record a decision for an application (CHAIRPERSON / IRB_ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Decision recorded.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_decision_dto_1.CreateDecisionDto, Object]),
    __metadata("design:returntype", void 0)
], DecisionsController.prototype, "record", null);
__decorate([
    (0, common_1.Get)('application/:applicationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all decisions for an application' }),
    (0, swagger_1.ApiParam)({ name: 'applicationId', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Decisions returned.' }),
    __param(0, (0, common_1.Param)('applicationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecisionsController.prototype, "findByApplication", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single decision by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Decision UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Decision returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Decision not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecisionsController.prototype, "findOne", null);
exports.DecisionsController = DecisionsController = __decorate([
    (0, swagger_1.ApiTags)('decisions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('decisions'),
    __metadata("design:paramtypes", [decisions_service_1.DecisionsService])
], DecisionsController);
//# sourceMappingURL=decisions.controller.js.map