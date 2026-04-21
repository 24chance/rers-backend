import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { ReviewerAssignmentsService } from './reviewer-assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class ReviewerAssignmentsController {
    private readonly reviewerAssignmentsService;
    constructor(reviewerAssignmentsService: ReviewerAssignmentsService);
    assign(dto: CreateAssignmentDto, user: JwtPayload): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findByReviewer(reviewerId: string): Promise<any[]>;
    declareConflict(id: string, dto: UpdateAssignmentDto, user: JwtPayload): Promise<any>;
    deactivate(id: string, user: JwtPayload): Promise<any>;
}
