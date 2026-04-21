import { DatabaseService } from '../../common/database/database.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { RespondQueryDto } from './dto/respond-query.dto';
export declare class QueriesService {
    private readonly database;
    constructor(database: DatabaseService);
    raiseQuery(applicationId: string, adminId: string, dto: CreateQueryDto): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    respondToQuery(applicationId: string, queryId: string, userId: string, dto: RespondQueryDto): Promise<any>;
    resolveQuery(applicationId: string, queryId: string): Promise<any>;
}
