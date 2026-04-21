import { ReceiptsService } from './receipts.service';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByPayment(paymentId: string): Promise<any>;
}
