export declare class UpdateApplicationDto {
    title?: string;
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
