import { DatabaseService } from '../../common/database/database.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { CertificatesService } from '../certificates/certificates.service';
export declare class DecisionsService {
    private readonly database;
    private readonly certificatesService;
    constructor(database: DatabaseService, certificatesService: CertificatesService);
    record(applicationId: string, actorId: string, dto: CreateDecisionDto): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
}
