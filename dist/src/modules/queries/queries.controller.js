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
exports.QueriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_query_dto_1 = require("./dto/create-query.dto");
const respond_query_dto_1 = require("./dto/respond-query.dto");
const queries_service_1 = require("./queries.service");
let QueriesController = class QueriesController {
    queriesService;
    constructor(queriesService) {
        this.queriesService = queriesService;
    }
    findByApplication(id) {
        return this.queriesService.findByApplication(id);
    }
    raiseQuery(id, dto, user) {
        return this.queriesService.raiseQuery(id, user.id, dto);
    }
    respondToQuery(id, queryId, dto, user) {
        return this.queriesService.respondToQuery(id, queryId, user.id, dto);
    }
    resolveQuery(id, queryId) {
        return this.queriesService.resolveQuery(id, queryId);
    }
};
exports.QueriesController = QueriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all queries for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Array of queries returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findByApplication", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN, user_role_enum_1.UserRole.CHAIRPERSON, user_role_enum_1.UserRole.REVIEWER),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Raise a query on an application (admin/reviewer roles)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Query raised.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_query_dto_1.CreateQueryDto, Object]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "raiseQuery", null);
__decorate([
    (0, common_1.Post)(':queryId/respond'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Respond to a query (any authenticated user)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiParam)({ name: 'queryId', description: 'Query UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Response recorded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Query is already resolved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Query or application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('queryId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, respond_query_dto_1.RespondQueryDto, Object]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "respondToQuery", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN, user_role_enum_1.UserRole.CHAIRPERSON, user_role_enum_1.UserRole.REVIEWER),
    (0, common_1.Patch)(':queryId/resolve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Resolve a query (admin/reviewer roles)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiParam)({ name: 'queryId', description: 'Query UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Query resolved.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Query is already resolved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Query or application not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('queryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "resolveQuery", null);
exports.QueriesController = QueriesController = __decorate([
    (0, swagger_1.ApiTags)('queries'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('applications/:id/queries'),
    __metadata("design:paramtypes", [queries_service_1.QueriesService])
], QueriesController);
//# sourceMappingURL=queries.controller.js.map