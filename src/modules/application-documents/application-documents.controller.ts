import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApplicationDocumentsService } from './application-documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';

@ApiTags('application-documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('applications/:id/documents')
export class ApplicationDocumentsController {
  constructor(
    private readonly documentsService: ApplicationDocumentsService,
  ) {}

  // ─── POST /applications/:id/documents ─────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const appId = (_req.params as Record<string, string>)['id'] ?? 'unknown';
          const uploadDir = join(process.cwd(), 'uploads', appId);
          // Ensure directory exists (multer does NOT create nested dirs automatically)
          // We use require here to keep it synchronous without introducing extra deps
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          require('fs').mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'documentType'],
      properties: {
        file: { type: 'string', format: 'binary' },
        documentType: { type: 'string' },
        version: { type: 'integer' },
      },
    },
  })
  @ApiOperation({ summary: 'Upload a document for an application' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  @ApiResponse({ status: 201, description: 'Document uploaded.' })
  @ApiResponse({ status: 400, description: 'Invalid file type or missing file.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  uploadDocument(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.documentsService.uploadDocument(file, id, dto, user.id);
  }

  // ─── GET /applications/:id/documents ──────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List all documents for an application' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  @ApiResponse({ status: 200, description: 'Array of documents returned.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  findByApplication(@Param('id') id: string) {
    return this.documentsService.findByApplication(id);
  }

  // ─── GET /applications/:id/documents/:docId ───────────────────────────────────

  @Get(':docId')
  @ApiOperation({ summary: 'Download / retrieve document metadata by id' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  @ApiParam({ name: 'docId', description: 'Document UUID' })
  @ApiResponse({ status: 200, description: 'File served.' })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  async getDocument(
    @Param('id') id: string,
    @Param('docId') docId: string,
    @CurrentUser() user: JwtPayload,
    @Res() res: Response,
  ) {
    const filePath = await this.documentsService.getDownloadPath(
      id,
      docId,
      user.id,
    );
    res.sendFile(filePath);
  }

  // ─── DELETE /applications/:id/documents/:docId ────────────────────────────────

  @Delete(':docId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a document by id' })
  @ApiParam({ name: 'id', description: 'Application UUID' })
  @ApiParam({ name: 'docId', description: 'Document UUID' })
  @ApiResponse({ status: 200, description: 'Document deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Document not found.' })
  deleteDocument(
    @Param('id') id: string,
    @Param('docId') docId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.documentsService.deleteDocument(id, docId, user.id);
  }
}
