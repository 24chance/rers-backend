import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { DatabaseService } from '../../common/database/database.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
export interface MulterMemoryFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class ApplicationDocumentsService {
    private readonly database;
    private readonly cloudinary;
    constructor(database: DatabaseService, cloudinary: CloudinaryService);
    uploadDocument(file: MulterMemoryFile, applicationId: string, dto: UploadDocumentDto, userId: string): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findOne(applicationId: string, docId: string): Promise<any>;
    deleteDocument(applicationId: string, docId: string, userId: string): Promise<{
        message: string;
    }>;
    getUrl(applicationId: string, docId: string): Promise<string>;
}
