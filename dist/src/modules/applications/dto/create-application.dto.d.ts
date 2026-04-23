import { ApplicationType } from '../../../common/enums';
export declare class CreateApplicationDto {
    title: string;
    type: ApplicationType;
    tenantId?: string;
    destinationId?: string;
    principalInvestigator?: string;
    coInvestigators?: string[];
    studyDuration?: string;
    studyStartDate?: string;
    studyEndDate?: string;
    population?: string;
    sampleSize?: number;
    methodology?: string;
    fundingSource?: string;
    budget?: number;
    ethicsStatement?: string;
    consentDescription?: string;
    formData?: Record<string, unknown>;
}
