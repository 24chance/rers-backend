import { SeverityLevel } from '../../../common/enums';
export declare class CreateAdverseEventDto {
    eventDate: string;
    description: string;
    severity: SeverityLevel;
    affectedParticipants?: number;
    actionTaken?: string;
}
