import { DatabaseService } from '../../common/database/database.service';
export declare class ReceiptsService {
    private readonly database;
    constructor(database: DatabaseService);
    create(paymentId: string, amount: number): Promise<any>;
    findByPayment(paymentId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    findAll(filters?: {
        paymentId?: string;
    }): Promise<any[]>;
    private generateReceiptNumber;
}
