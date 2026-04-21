import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { MonitoringService } from './monitoring.service';
import { CreateAmendmentDto } from './dto/create-amendment.dto';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { CreateProgressReportDto } from './dto/create-progress-report.dto';
import { CreateAdverseEventDto } from './dto/create-adverse-event.dto';
import { CreateDeviationDto } from './dto/create-deviation.dto';
import { CreateClosureDto } from './dto/create-closure.dto';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    createAmendment(id: string, dto: CreateAmendmentDto, user: JwtPayload): Promise<any>;
    getAmendments(id: string): Promise<any[]>;
    createRenewal(id: string, dto: CreateRenewalDto, user: JwtPayload): Promise<any>;
    getRenewals(id: string): Promise<any[]>;
    createProgressReport(id: string, dto: CreateProgressReportDto, user: JwtPayload): Promise<any>;
    getProgressReports(id: string): Promise<any[]>;
    createAdverseEvent(id: string, dto: CreateAdverseEventDto, user: JwtPayload): Promise<any>;
    getAdverseEvents(id: string): Promise<any[]>;
    createDeviation(id: string, dto: CreateDeviationDto, user: JwtPayload): Promise<any>;
    getDeviations(id: string): Promise<any[]>;
    createClosureReport(id: string, dto: CreateClosureDto, user: JwtPayload): Promise<any>;
    getClosureReports(id: string): Promise<any[]>;
}
