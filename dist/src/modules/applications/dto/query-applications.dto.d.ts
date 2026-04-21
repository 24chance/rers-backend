import { ApplicationStatus, ApplicationType } from '../../../common/enums';
export declare class QueryApplicationsDto {
    status?: ApplicationStatus;
    type?: ApplicationType;
    tenantId?: string;
    applicantId?: string;
    search?: string;
    page?: string;
    pageSize?: string;
    limit?: string;
}
