import { DatabaseService } from '../../common/database/database.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UserRole } from '../../common/enums/user-role.enum';
interface InvoiceActorContext {
    id: string;
    role: UserRole;
    tenantId: string | null;
}
export declare class InvoicesService {
    private readonly database;
    constructor(database: DatabaseService);
    create(applicationId: string, dto: CreateInvoiceDto, actor: InvoiceActorContext): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findAll(tenantId?: string, filters?: {
        status?: string;
    }): Promise<any[]>;
}
export {};
