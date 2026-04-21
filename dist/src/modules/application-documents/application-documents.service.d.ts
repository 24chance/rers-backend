import { DatabaseService } from '../../common/database/database.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
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
export declare class ApplicationDocumentsService {
    private readonly database;
    constructor(database: DatabaseService);
    uploadDocument(file: MulterFile, applicationId: string, dto: UploadDocumentDto, userId: string): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findOne(applicationId: string, docId: string): Promise<any>;
    deleteDocument(applicationId: string, docId: string, userId: string): Promise<{
        message: string;
    }>;
    getDownloadPath(applicationId: string, docId: string, _userId: string): Promise<string>;
}
export {};
