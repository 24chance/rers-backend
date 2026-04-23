import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReviewerAssignmentsService } from './reviewer-assignments.service';
import { AssignApplicationReviewerDto } from './dto/assign-application-reviewer.dto';
export declare class ApplicationReviewersController {
    private readonly reviewerAssignmentsService;
    constructor(reviewerAssignmentsService: ReviewerAssignmentsService);
    assign(applicationId: string, dto: AssignApplicationReviewerDto, user: JwtPayload): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
}
