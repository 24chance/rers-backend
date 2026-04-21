import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { CreateQueryDto } from './dto/create-query.dto';
import { RespondQueryDto } from './dto/respond-query.dto';
import { QueriesService } from './queries.service';
export declare class QueriesController {
    private readonly queriesService;
    constructor(queriesService: QueriesService);
    findByApplication(id: string): Promise<any[]>;
    raiseQuery(id: string, dto: CreateQueryDto, user: JwtPayload): Promise<any>;
    respondToQuery(id: string, queryId: string, dto: RespondQueryDto, user: JwtPayload): Promise<any>;
    resolveQuery(id: string, queryId: string): Promise<any>;
}
