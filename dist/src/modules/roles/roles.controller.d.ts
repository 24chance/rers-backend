import { AssignPermissionDto } from './dto/assign-permission.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    assignPermission(id: string, dto: AssignPermissionDto): Promise<any>;
    removePermission(id: string, permId: string): Promise<any>;
}
