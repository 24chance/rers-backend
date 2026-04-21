import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InstitutionsService } from './institutions.service';
export declare class InstitutionsController {
    private readonly institutionsService;
    constructor(institutionsService: InstitutionsService);
    create(dto: CreateInstitutionDto): Promise<any>;
    findAll(tenantId?: string, search?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateInstitutionDto): Promise<any>;
}
