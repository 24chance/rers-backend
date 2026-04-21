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
exports.RegistryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const registry_service_1 = require("./registry.service");
let RegistryController = class RegistryController {
    registryService;
    constructor(registryService) {
        this.registryService = registryService;
    }
    findAll(page, pageSize, type, search) {
        return this.registryService.findAll({ page, pageSize, type, search });
    }
    verifyCertificate(token) {
        return this.registryService.verifyCertificate(token);
    }
    findOne(id) {
        return this.registryService.findOne(id);
    }
};
exports.RegistryController = RegistryController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Browse the public ethics registry of approved studies' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, description: 'ApplicationType filter' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Search by title' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Paginated registry returned.' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], RegistryController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('verify/:token'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify an ethics certificate by token (public)' }),
    (0, swagger_1.ApiParam)({ name: 'token', description: 'Certificate verification token (UUID)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Certificate verified.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Invalid token.' }),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegistryController.prototype, "verifyCertificate", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public details of an approved study' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Study details returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Study not found in registry.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RegistryController.prototype, "findOne", null);
exports.RegistryController = RegistryController = __decorate([
    (0, swagger_1.ApiTags)('registry'),
    (0, common_1.Controller)('registry'),
    __metadata("design:paramtypes", [registry_service_1.RegistryService])
], RegistryController);
//# sourceMappingURL=registry.controller.js.map