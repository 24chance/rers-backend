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
exports.ApplicationDocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const application_documents_service_1 = require("./application-documents.service");
const upload_document_dto_1 = require("./dto/upload-document.dto");
let ApplicationDocumentsController = class ApplicationDocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    uploadDocument(id, file, dto, user) {
        return this.documentsService.uploadDocument(file, id, dto, user.id);
    }
    findByApplication(id) {
        return this.documentsService.findByApplication(id);
    }
    async getDocument(id, docId, user, res) {
        const filePath = await this.documentsService.getDownloadPath(id, docId, user.id);
        res.sendFile(filePath);
    }
    deleteDocument(id, docId, user) {
        return this.documentsService.deleteDocument(id, docId, user.id);
    }
};
exports.ApplicationDocumentsController = ApplicationDocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_req, _file, cb) => {
                const appId = _req.params['id'] ?? 'unknown';
                const uploadDir = (0, path_1.join)(process.cwd(), 'uploads', appId);
                require('fs').mkdirSync(uploadDir, { recursive: true });
                cb(null, uploadDir);
            },
            filename: (_req, file, cb) => {
                const uniqueSuffix = (0, uuid_1.v4)();
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
        limits: { fileSize: 20 * 1024 * 1024 },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['file', 'documentType'],
            properties: {
                file: { type: 'string', format: 'binary' },
                documentType: { type: 'string' },
                version: { type: 'integer' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a document for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Document uploaded.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file type or missing file.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, upload_document_dto_1.UploadDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], ApplicationDocumentsController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all documents for an application' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Array of documents returned.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Application not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationDocumentsController.prototype, "findByApplication", null);
__decorate([
    (0, common_1.Get)(':docId'),
    (0, swagger_1.ApiOperation)({ summary: 'Download / retrieve document metadata by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiParam)({ name: 'docId', description: 'Document UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File served.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('docId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationDocumentsController.prototype, "getDocument", null);
__decorate([
    (0, common_1.Delete)(':docId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a document by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Application UUID' }),
    (0, swagger_1.ApiParam)({ name: 'docId', description: 'Document UUID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('docId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationDocumentsController.prototype, "deleteDocument", null);
exports.ApplicationDocumentsController = ApplicationDocumentsController = __decorate([
    (0, swagger_1.ApiTags)('application-documents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('applications/:id/documents'),
    __metadata("design:paramtypes", [application_documents_service_1.ApplicationDocumentsService])
], ApplicationDocumentsController);
//# sourceMappingURL=application-documents.controller.js.map