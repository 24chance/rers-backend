import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(invoiceId: string, dto: CreatePaymentDto): Promise<any>;
    findByInvoice(invoiceId: string): Promise<any[]>;
    findAll(user: JwtPayload): Promise<any[]>;
    verify(id: string, dto: VerifyPaymentDto, user: JwtPayload): Promise<any>;
}
