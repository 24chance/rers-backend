import { DatabaseService } from '../../common/database/database.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesService {
    private readonly database;
    constructor(database: DatabaseService);
    create(applicationId: string, dto: CreateInvoiceDto): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findAll(tenantId?: string, filters?: {
        status?: string;
    }): Promise<any[]>;
}
