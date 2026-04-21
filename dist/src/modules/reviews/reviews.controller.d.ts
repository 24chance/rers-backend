import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { SubmitReviewDto } from './dto/submit-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    startReview(dto: CreateReviewDto, user: JwtPayload): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findByReviewer(reviewerId: string): Promise<any[]>;
    findOne(id: string, user: JwtPayload): Promise<any>;
    submitReview(id: string, dto: SubmitReviewDto, user: JwtPayload): Promise<any>;
}
