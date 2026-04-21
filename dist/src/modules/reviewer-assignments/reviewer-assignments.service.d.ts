import { DatabaseService } from '../../common/database/database.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
export declare class ReviewerAssignmentsService {
    private readonly database;
    constructor(database: DatabaseService);
    assign(assignedById: string, dto: CreateAssignmentDto): Promise<any>;
    findByApplication(applicationId: string): Promise<any[]>;
    findByReviewer(reviewerId: string): Promise<any[]>;
    declareConflict(assignmentId: string, reviewerId: string, reason: string): Promise<any>;
    deactivate(assignmentId: string, adminId: string): Promise<any>;
}
