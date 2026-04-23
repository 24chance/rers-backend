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
exports.ApplicationDocumentsService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_service_1 = require("../../common/cloudinary/cloudinary.service");
const database_service_1 = require("../../common/database/database.service");
const ALLOWED_MIME_TYPES = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
]);
let ApplicationDocumentsService = class ApplicationDocumentsService {
    database;
    cloudinary;
    constructor(database, cloudinary) {
        this.database = database;
        this.cloudinary = cloudinary;
    }
    async uploadDocument(file, applicationId, dto, userId) {
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            throw new common_1.BadRequestException(`File type "${file.mimetype}" is not allowed. Permitted: pdf, doc, docx, jpg, png.`);
        }
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true, applicantId: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${applicationId}" not found.`);
        }
        const { url, publicId } = await this.cloudinary.upload(file.buffer, {
            folder: `rers/applications/${applicationId}`,
            originalName: file.originalname,
        });
        const document = await this.database.applicationDocument.create({
            data: {
                applicationId,
                fileName: file.originalname,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                path: url,
                cloudinaryPublicId: publicId,
                documentType: dto.documentType,
                version: dto.version ?? 1,
                uploadedById: userId,
            },
        });
        return document;
    }
    async findByApplication(applicationId) {
        const application = await this.database.application.findUnique({
            where: { id: applicationId },
            select: { id: true },
        });
        if (!application) {
            throw new common_1.NotFoundException(`Application with id "${applicationId}" not found.`);
        }
        return this.database.applicationDocument.findMany({
            where: { applicationId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(applicationId, docId) {
        const document = await this.database.applicationDocument.findFirst({
            where: { id: docId, applicationId },
        });
        if (!document) {
            throw new common_1.NotFoundException(`Document with id "${docId}" not found on application "${applicationId}".`);
        }
        return document;
    }
    async deleteDocument(applicationId, docId, userId) {
        const document = await this.findOne(applicationId, docId);
        if (document.uploadedById && document.uploadedById !== userId) {
            throw new common_1.ForbiddenException('You can only delete documents you uploaded.');
        }
        if (document.cloudinaryPublicId) {
            const resourceType = document.mimeType.startsWith('image/') ? 'image' : 'raw';
            await this.cloudinary.delete(document.cloudinaryPublicId, resourceType);
        }
        await this.database.applicationDocument.delete({ where: { id: docId } });
        return { message: `Document "${docId}" deleted.` };
    }
    async getUrl(applicationId, docId) {
        const document = await this.findOne(applicationId, docId);
        return document.path;
    }
};
exports.ApplicationDocumentsService = ApplicationDocumentsService;
exports.ApplicationDocumentsService = ApplicationDocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        cloudinary_service_1.CloudinaryService])
], ApplicationDocumentsService);
//# sourceMappingURL=application-documents.service.js.map