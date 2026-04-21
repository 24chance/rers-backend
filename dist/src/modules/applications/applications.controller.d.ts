import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ApplicationsService } from './applications.service';
import { AdvanceStatusDto } from './dto/advance-status.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { QueryApplicationsDto } from './dto/query-applications.dto';
import { ScreenApplicationDto } from './dto/screen-application.dto';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(dto: CreateApplicationDto, user: JwtPayload): Promise<any>;
    findAll(filters: QueryApplicationsDto, user: JwtPayload): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, user: JwtPayload): Promise<any>;
    update(id: string, dto: UpdateApplicationDto, user: JwtPayload): Promise<any>;
    submit(id: string, _dto: SubmitApplicationDto, user: JwtPayload): Promise<any>;
    screen(id: string, dto: ScreenApplicationDto, user: JwtPayload): Promise<any>;
    advanceStatus(id: string, dto: AdvanceStatusDto, user: JwtPayload): Promise<any>;
    getTimeline(id: string): Promise<{
        application: any;
        timeline: any[];
    }>;
}
