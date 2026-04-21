import { DatabaseService } from '../../common/database/database.service';
import { QueryAuditLogsDto } from './dto/query-audit-logs.dto';
export interface CreateAuditLogDto {
    actorId?: string;
    action: string;
    targetEntity: string;
    targetId: string;
    tenantId?: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
}
export declare class AuditLogsService {
    private readonly database;
    constructor(database: DatabaseService);
    log(dto: CreateAuditLogDto): Promise<any>;
    findAll(filters: QueryAuditLogsDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
}
