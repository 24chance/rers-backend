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
    getRnecAdminDashboard(): Promise<{
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
    getSystemAdminDashboard(): Promise<{
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
    getChairpersonDashboard(user: JwtPayload): Promise<{
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
    getFinanceDashboard(user: JwtPayload): Promise<{
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
}
