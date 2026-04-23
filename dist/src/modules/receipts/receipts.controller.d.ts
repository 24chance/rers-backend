import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReceiptsService } from './receipts.service';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    findAll(user: JwtPayload): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByPayment(paymentId: string): Promise<any>;
}
