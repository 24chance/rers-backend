import { UserRole } from '../enums/user-role.enum';
export interface JwtPayload {
    sub: string;
    id: string;
    email: string;
    role: UserRole;
    tenantId: string | null;
    iat?: number;
    exp?: number;
}
export declare const CurrentUser: (...dataOrPipes: (keyof JwtPayload | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>> | undefined)[]) => ParameterDecorator;
