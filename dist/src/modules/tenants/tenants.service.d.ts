import { DatabaseService } from '../../common/database/database.service';
import { UserProvisioningService } from '../../common/user-provisioning/user-provisioning.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { QueryTenantDto } from './dto/query-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
export declare class TenantsService {
    private readonly database;
    private readonly provisioning;
    constructor(database: DatabaseService, provisioning: UserProvisioningService);
    create(dto: CreateTenantDto): Promise<any>;
    findAll(query: QueryTenantDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateTenantDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getTenantStats(id: string): Promise<{
        tenantId: string;
        totalUsers: number;
        totalApplications: number;
        totalInstitutions: number;
        applicationsByStatus: {
            status: any;
            count: any;
        }[];
    }>;
}
