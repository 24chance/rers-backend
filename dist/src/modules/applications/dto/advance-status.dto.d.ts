import { ApplicationStatus } from '../../../common/enums';
export declare class AdvanceStatusDto {
    toStatus: ApplicationStatus;
    reason?: string;
    notes?: string;
}
