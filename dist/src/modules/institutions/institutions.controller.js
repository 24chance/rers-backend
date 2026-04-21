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
exports.InstitutionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_institution_dto_1 = require("./dto/create-institution.dto");
const update_institution_dto_1 = require("./dto/update-institution.dto");
const institutions_service_1 = require("./institutions.service");
let InstitutionsController = class InstitutionsController {
    institutionsService;
    constructor(institutionsService) {
        this.institutionsService = institutionsService;
    }
    create(dto) {
        return this.institutionsService.create(dto);
    }
    findAll(tenantId, search) {
        return this.institutionsService.findAll(tenantId, search);
    }
    findOne(id) {
        return this.institutionsService.findOne(id);
    }
    update(id, dto) {
        return this.institutionsService.update(id, dto);
    }
};
exports.InstitutionsController = InstitutionsController;
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new institution (IRB_ADMIN, RNEC_ADMIN, SYSTEM_ADMIN)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Institution created.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Institution code already exists.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_institution_dto_1.CreateInstitutionDto]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List institutions, optionally filtered by tenantId or search' }),
    (0, swagger_1.ApiQuery)({ name: 'tenantId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Array of institutions returned.' }),
    __param(0, (0, common_1.Query)('tenantId')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single institution by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Institution UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Institution record returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Institution not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.IRB_ADMIN, user_role_enum_1.UserRole.RNEC_ADMIN, user_role_enum_1.UserRole.SYSTEM_ADMIN),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update an institution (IRB_ADMIN, RNEC_ADMIN, SYSTEM_ADMIN)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Institution UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Institution updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Institution not found.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_institution_dto_1.UpdateInstitutionDto]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "update", null);
exports.InstitutionsController = InstitutionsController = __decorate([
    (0, swagger_1.ApiTags)('institutions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('institutions'),
    __metadata("design:paramtypes", [institutions_service_1.InstitutionsService])
], InstitutionsController);
//# sourceMappingURL=institutions.controller.js.map