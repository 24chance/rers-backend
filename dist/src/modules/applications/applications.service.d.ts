import { UserRole } from '../../common/enums/user-role.enum';
import { DatabaseService } from '../../common/database/database.service';
import { WorkflowsService } from '../workflows/workflows.service';
import { AdvanceStatusDto } from './dto/advance-status.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';
import { ScreenApplicationDto } from './dto/screen-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
export declare class ApplicationsService {
    private readonly database;
    private readonly workflowsService;
    constructor(database: DatabaseService, workflowsService: WorkflowsService);
    private generateReferenceNumber;
    create(userId: string, userTenantId: string | null, dto: CreateApplicationDto): Promise<any>;
    findAll(userId: string, role: UserRole, userTenantId: string | null, filters: QueryApplicationsDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, userId: string, role: UserRole): Promise<any>;
    update(id: string, userId: string, dto: UpdateApplicationDto): Promise<any>;
    submit(id: string, userId: string): Promise<any>;
    screen(id: string, adminId: string, dto: ScreenApplicationDto): Promise<any>;
    advanceStatus(id: string, actorId: string, dto: AdvanceStatusDto): Promise<any>;
    getTimeline(id: string): Promise<{
        application: any;
        timeline: any[];
    }>;
    private defaultInclude;
}
