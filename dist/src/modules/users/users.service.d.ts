import { UserRole } from '../../common/enums/user-role.enum';
import { DatabaseService } from '../../common/database/database.service';
import { UserProvisioningService } from '../../common/user-provisioning/user-provisioning.service';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export interface FindAllQuery {
    page?: number;
    pageSize?: number;
    tenantId?: string;
    role?: UserRole;
}
export declare class UsersService {
    private readonly database;
    private readonly provisioning;
    constructor(database: DatabaseService, provisioning: UserProvisioningService);
    createUser(dto: CreateUserDto, requestingUser: JwtPayload): Promise<any>;
    findAll(query: FindAllQuery, requestingUser: JwtPayload): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateUserDto): Promise<any>;
    updateRole(id: string, dto: UpdateRoleDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
