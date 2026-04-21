import { DatabaseService } from '../../common/database/database.service';
import { BootstrapDto } from './dto/bootstrap.dto';
export declare class BootstrapService {
    private readonly database;
    constructor(database: DatabaseService);
    seed(dto: BootstrapDto): Promise<{
        message: string;
        rolesSeeded: string | string[];
        adminCreated: string;
    }>;
}
