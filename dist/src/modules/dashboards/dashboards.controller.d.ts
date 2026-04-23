import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { DashboardsService } from './dashboards.service';
export declare class DashboardsController {
    private readonly dashboardsService;
    constructor(dashboardsService: DashboardsService);
    getSummary(user: JwtPayload): Promise<{
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
            status: import("../../common/enums").ApplicationStatus;
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
    getApplicantDashboard(user: JwtPayload): Promise<{
        totalApplications: number;
        draftApplications: number;
        underReviewApplications: number;
        approvedApplications: number;
        recentApplications: any[];
    }>;
    getReviewerDashboard(user: JwtPayload): Promise<{
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
    getIrbAdminDashboard(user: JwtPayload): Promise<{
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
            status: import("../../common/enums").ApplicationStatus;
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
    getRnecAdminDashboard(): Promise<{
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
    getChairpersonDashboard(user: JwtPayload): Promise<{
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
            status: import("../../common/enums").ApplicationStatus;
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
    getFinanceDashboard(user: JwtPayload): Promise<{
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
            status: import("../../common/enums").ApplicationStatus;
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
}
