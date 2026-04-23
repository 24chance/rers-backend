import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(applicationId: string, dto: CreateInvoiceDto, user: JwtPayload): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findAll(user: JwtPayload): Promise<any[]>;
}
