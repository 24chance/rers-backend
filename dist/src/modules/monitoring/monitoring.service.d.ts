import { MonitoringType } from '../../common/enums';
import { DatabaseService } from '../../common/database/database.service';
import { CreateAmendmentDto } from './dto/create-amendment.dto';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { CreateProgressReportDto } from './dto/create-progress-report.dto';
import { CreateAdverseEventDto } from './dto/create-adverse-event.dto';
import { CreateDeviationDto } from './dto/create-deviation.dto';
import { CreateClosureDto } from './dto/create-closure.dto';
export declare class MonitoringService {
    private readonly database;
    constructor(database: DatabaseService);
    private ensureApplicationExists;
    createAmendment(applicationId: string, userId: string, dto: CreateAmendmentDto): Promise<any>;
    createRenewal(applicationId: string, userId: string, dto: CreateRenewalDto): Promise<any>;
    createProgressReport(applicationId: string, userId: string, dto: CreateProgressReportDto): Promise<any>;
    createAdverseEvent(applicationId: string, userId: string, dto: CreateAdverseEventDto): Promise<any>;
    createDeviation(applicationId: string, userId: string, dto: CreateDeviationDto): Promise<any>;
    createClosureReport(applicationId: string, userId: string, dto: CreateClosureDto): Promise<any>;
    getByApplication(applicationId: string, type: MonitoringType): Promise<any[]>;
}
