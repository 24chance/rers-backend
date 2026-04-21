import { DatabaseService } from '../../common/database/database.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionsService {
    private readonly database;
    constructor(database: DatabaseService);
    create(dto: CreateInstitutionDto): Promise<any>;
    findAll(tenantId?: string, search?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByTenant(tenantId: string): Promise<any[]>;
    update(id: string, dto: UpdateInstitutionDto): Promise<any>;
}
