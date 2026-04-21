import { UserRole } from '../../common/enums/user-role.enum';
import { DatabaseService } from '../../common/database/database.service';
export declare class DashboardsService {
    private readonly database;
    constructor(database: DatabaseService);
    getSummary(role: UserRole, userId: string, tenantId?: string | null): Promise<{
        totalApplications: number;
        draftApplications: number;
        underReviewApplications: number;
        approvedApplications: number;
        recentApplications: any[];
    } | {
        totalSubmissions: number;
        pendingScreening: number;
        pendingReview: number;
        approved: number;
        rejected: number;
        paymentPending: number;
        activeMonitoring: number;
        reviewerWorkload: {
            reviewerId: any;
            name: string;
            assignedCount: any;
        }[];
    }>;
    getApplicantDashboard(userId: string): Promise<{
        totalApplications: number;
        draftApplications: number;
        underReviewApplications: number;
        approvedApplications: number;
        recentApplications: any[];
    }>;
    getReviewerDashboard(userId: string): Promise<{
        assignedReviews: number;
        completedReviews: number;
        pendingReviews: number;
        recentAssignments: {
            id: any;
            applicationId: any;
            applicationTitle: any;
            referenceNumber: any;
            isComplete: boolean;
        }[];
    }>;
    private getApplicantSummary;
    private getTenantSummary;
    getRnecSummary(): Promise<{
        tenantBreakdowns: {
            tenantId: any;
            tenantName: any;
            tenantCode: any;
            total: number;
            approved: number;
            underReview: number;
            rejected: number;
        }[];
        totalSubmissions: number;
        pendingScreening: number;
        pendingReview: number;
        approved: number;
        rejected: number;
        paymentPending: number;
        activeMonitoring: number;
        reviewerWorkload: {
            reviewerId: any;
            name: string;
            assignedCount: any;
        }[];
    }>;
}
