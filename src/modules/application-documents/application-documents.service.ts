import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UploadDocumentDto } from './dto/upload-document.dto';

/** MIME types allowed for upload. */
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]);

@Injectable()
export class ApplicationDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── uploadDocument ───────────────────────────────────────────────────────────

  async uploadDocument(
    file: Express.Multer.File,
    applicationId: string,
    dto: UploadDocumentDto,
    userId: string,
  ) {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw new BadRequestException(
        `File type "${file.mimetype}" is not allowed. Permitted: pdf, doc, docx, jpg, png.`,
      );
    }

    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, applicantId: true },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with id "${applicationId}" not found.`,
      );
    }

    const document = await this.prisma.applicationDocument.create({
      data: {
        applicationId,
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        documentType: dto.documentType,
        version: dto.version ?? 1,
        uploadedById: userId,
      },
    });

    return document;
  }

  // ─── findByApplication ────────────────────────────────────────────────────────

  async findByApplication(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with id "${applicationId}" not found.`,
      );
    }

    return this.prisma.applicationDocument.findMany({
      where: { applicationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(applicationId: string, docId: string) {
    const document = await this.prisma.applicationDocument.findFirst({
      where: { id: docId, applicationId },
    });

    if (!document) {
      throw new NotFoundException(
        `Document with id "${docId}" not found on application "${applicationId}".`,
      );
    }

    return document;
  }

  // ─── deleteDocument ───────────────────────────────────────────────────────────

  async deleteDocument(
    applicationId: string,
    docId: string,
    userId: string,
  ) {
    const document = await this.findOne(applicationId, docId);

    // Only the uploader or an admin (no role check here — controller handles @Roles)
    if (document.uploadedById && document.uploadedById !== userId) {
      throw new ForbiddenException(
        'You can only delete documents you uploaded.',
      );
    }

    await this.prisma.applicationDocument.delete({ where: { id: docId } });

    return { message: `Document "${docId}" deleted.` };
  }

  // ─── getDownloadPath ──────────────────────────────────────────────────────────

  async getDownloadPath(
    applicationId: string,
    docId: string,
    _userId: string,
  ): Promise<string> {
    const document = await this.findOne(applicationId, docId);

    // Return the absolute path so the controller can use sendFile / res.download
    return join(process.cwd(), document.path);
  }
}
