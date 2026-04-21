import { BootstrapService } from './bootstrap.service';
import { BootstrapDto } from './dto/bootstrap.dto';
export declare class BootstrapController {
    private readonly bootstrapService;
    constructor(bootstrapService: BootstrapService);
    seed(dto: BootstrapDto): Promise<{
        message: string;
        rolesSeeded: string | string[];
        adminCreated: string;
    }>;
}
