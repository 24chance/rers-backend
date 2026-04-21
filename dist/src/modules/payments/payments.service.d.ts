import { DatabaseService } from '../../common/database/database.service';
import { ReceiptsService } from '../receipts/receipts.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
export declare class PaymentsService {
    private readonly database;
    private readonly receiptsService;
    constructor(database: DatabaseService, receiptsService: ReceiptsService);
    create(invoiceId: string, dto: CreatePaymentDto): Promise<any>;
    verify(paymentId: string, officerId: string, dto: VerifyPaymentDto): Promise<any>;
    findByInvoice(invoiceId: string): Promise<any[]>;
}
