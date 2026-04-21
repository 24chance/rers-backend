import { DecisionType } from '../../../common/enums';
export declare class CreateDecisionDto {
    type: DecisionType;
    rationale: string;
    conditions?: string;
}
