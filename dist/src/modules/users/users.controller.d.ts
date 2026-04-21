import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto, user: JwtPayload): Promise<any>;
    findAll(page?: string, pageSize?: string, tenantId?: string, user?: JwtPayload): Promise<{
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
