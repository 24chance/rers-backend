import { ApplicationStatus } from '../../common/enums';
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
        totalApplications: number;
        pendingScreening: number;
        underReview: number;
        approved: number;
        conditionallyApproved: number;
        rejected: number;
        paymentPending: number;
        activeMonitoring: number;
        applicationsByStatus: {
            status: ApplicationStatus;
            count: number;
        }[];
        recentActivity: {
            applicationId: any;
            referenceNumber: any;
            action: string;
            actorName: string;
            createdAt: string;
        }[];
        reviewerWorkload: {
            reviewerId: any;
            name: string;
            assignedCount: any;
        }[];
    } | {
        totalApplications: number;
        totalApproved: number;
        totalPending: number;
        totalRejected: number;
        tenantStats: {
            tenant: {
                id: any;
                name: any;
                code: any;
                isActive: any;
            };
            total: number;
            approved: number;
            pending: number;
            rejected: number;
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
            deadline: string | undefined;
            isComplete: boolean;
        }[];
    }>;
    private getApplicantSummary;
    private getTenantSummary;
    getRnecSummary(): Promise<{
        totalApplications: number;
        totalApproved: number;
        totalPending: number;
        totalRejected: number;
        tenantStats: {
            tenant: {
                id: any;
                name: any;
                code: any;
                isActive: any;
            };
            total: number;
            approved: number;
            pending: number;
            rejected: number;
        }[];
    }>;
    getSystemAdminDashboard(): Promise<{
        totalUsers: number;
        totalTenants: number;
        totalRoles: number;
        recentAuditEvents: number;
    }>;
}
