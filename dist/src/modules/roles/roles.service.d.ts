import { DatabaseService } from '../../common/database/database.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';
export declare class RolesService {
    private readonly database;
    constructor(database: DatabaseService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    assignPermission(roleId: string, dto: AssignPermissionDto): Promise<any>;
    removePermission(roleId: string, permId: string): Promise<any>;
}
