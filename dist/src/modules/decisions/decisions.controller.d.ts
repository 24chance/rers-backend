import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { DecisionsService } from './decisions.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
export declare class DecisionsController {
    private readonly decisionsService;
    constructor(decisionsService: DecisionsService);
    record(applicationId: string, dto: CreateDecisionDto, user: JwtPayload): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
}
