import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../../common/decorators/current-user.decorator';
import { UserRole } from '../../../common/enums/user-role.enum';
interface RawJwtPayload {
    sub: string;
    email: string;
    role: UserRole;
    tenantId: string | null;
}
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: RawJwtPayload): JwtPayload;
}
export {};
