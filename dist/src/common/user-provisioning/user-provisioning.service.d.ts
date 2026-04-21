import { DatabaseService } from '../database/database.service';
import { EmailService } from '../email/email.service';
export interface ProvisionUserInput {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    roleId: string;
    tenantId?: string | null;
}
export declare class UserProvisioningService {
    private readonly database;
    private readonly emailService;
    private readonly logger;
    constructor(database: DatabaseService, emailService: EmailService);
    private generatePassword;
    provision(input: ProvisionUserInput): Promise<any>;
}
