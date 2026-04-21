import { DatabaseService } from '../database/database.service';
export interface CreateAuditLogParams {
    actorId?: string | null;
    action: string;
    targetEntity: string;
    targetId: string;
    tenantId?: string | null;
    metadata?: Record<string, unknown>;
    ipAddress?: string | null;
}
export declare function createAuditLog(database: DatabaseService, params: CreateAuditLogParams): Promise<void>;
