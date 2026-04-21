import { CreateTenantDto } from './dto/create-tenant.dto';
import { QueryTenantDto } from './dto/query-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenants.service';
export declare class TenantsController {
    private readonly tenantsService;
    constructor(tenantsService: TenantsService);
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
    getStats(id: string): Promise<{
        tenantId: string;
        totalUsers: number;
        totalApplications: number;
        totalInstitutions: number;
        applicationsByStatus: {
            status: any;
            count: any;
        }[];
    }>;
    update(id: string, dto: UpdateTenantDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
