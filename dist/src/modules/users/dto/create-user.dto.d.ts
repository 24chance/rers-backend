import { UserRole } from '../../../common/enums/user-role.enum';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: UserRole;
}
