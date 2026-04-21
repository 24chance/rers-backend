import { ReviewRecommendation } from '../../../common/enums';
export declare class SubmitReviewDto {
    comments: string;
    recommendation: ReviewRecommendation;
    conditions?: string;
}
