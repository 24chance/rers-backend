import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ApplicationDocumentsService } from './application-documents.service';
import type { MulterMemoryFile } from './application-documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
export declare class ApplicationDocumentsController {
    private readonly documentsService;
    constructor(documentsService: ApplicationDocumentsService);
    uploadDocument(id: string, file: MulterMemoryFile, dto: UploadDocumentDto, user: JwtPayload): Promise<any>;
    findByApplication(id: string): Promise<any[]>;
    getDocument(id: string, docId: string, user: JwtPayload): Promise<{
        url: string;
        statusCode: number;
    }>;
    deleteDocument(id: string, docId: string, user: JwtPayload): Promise<{
        message: string;
    }>;
}
