import type { Response } from 'express';
import type { JwtPayload } from '../../common/decorators/current-user.decorator';
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
import { ApplicationDocumentsService } from './application-documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
export declare class ApplicationDocumentsController {
    private readonly documentsService;
    constructor(documentsService: ApplicationDocumentsService);
    uploadDocument(id: string, file: MulterFile, dto: UploadDocumentDto, user: JwtPayload): Promise<any>;
    findByApplication(id: string): Promise<any[]>;
    getDocument(id: string, docId: string, user: JwtPayload, res: Response): Promise<void>;
    deleteDocument(id: string, docId: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
export {};
