import { ApplicationStatus } from '../../common/enums';
import { DatabaseService } from '../../common/database/database.service';
export declare class WorkflowsService {
    private readonly database;
    constructor(database: DatabaseService);
    validateTransition(from: ApplicationStatus | null, to: ApplicationStatus): void;
    recordTransition(applicationId: string, from: ApplicationStatus | null, to: ApplicationStatus, actorId: string | null, reason?: string, notes?: string): Promise<any>;
    getTimeline(applicationId: string): Promise<{
        application: any;
        timeline: any[];
    }>;
    getAllowedTransitions(from: ApplicationStatus): ApplicationStatus[];
}
