import { DatabaseService } from '../../common/database/database.service';
import { SubmitReviewDto } from './dto/submit-review.dto';
export declare class ReviewsService {
    private readonly database;
    constructor(database: DatabaseService);
    startReview(applicationId: string, reviewerId: string): Promise<any>;
    submitReview(reviewId: string, reviewerId: string, dto: SubmitReviewDto): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findByReviewer(reviewerId: string): Promise<any[]>;
    findOne(id: string, reviewerId: string): Promise<any>;
    private defaultInclude;
}
