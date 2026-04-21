import { Injectable } from '@nestjs/common';
import { ApplicationStatus } from '../../common/enums';
import { UserRole } from '../../common/enums/user-role.enum';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class DashboardsService {
  constructor(private readonly database: DatabaseService) {}

  // ─── getSummary ───────────────────────────────────────────────────────────────

  async getSummary(role: UserRole, userId: string, tenantId?: string | null) {
    if (role === UserRole.APPLICANT) {
      return this.getApplicantSummary(userId);
    }

    if (role === UserRole.RNEC_ADMIN || role === UserRole.SYSTEM_ADMIN) {
      return this.getRnecSummary();
    }

    // IRB_ADMIN, CHAIRPERSON, FINANCE_OFFICER — scoped to tenant
    return this.getTenantSummary(tenantId ?? undefined);
  }

  // ─── getApplicantDashboard ────────────────────────────────────────────────────

  async getApplicantDashboard(userId: string) {
    const [
      totalApplications,
      draftApplications,
      underReviewApplications,
      approvedApplications,
    ] = await this.database.$transaction([
      this.database.application.count({ where: { applicantId: userId } }),
      this.database.application.count({
        where: { applicantId: userId, status: ApplicationStatus.DRAFT },
      }),
      this.database.application.count({
        where: { applicantId: userId, status: ApplicationStatus.UNDER_REVIEW },
      }),
      this.database.application.count({
        where: { applicantId: userId, status: ApplicationStatus.APPROVED },
      }),
    ]);

    const recentApplications = await this.database.application.findMany({
      where: { applicantId: userId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        referenceNumber: true,
        title: true,
        status: true,
        updatedAt: true,
      },
    });

    return {
      totalApplications,
      draftApplications,
      underReviewApplications,
      approvedApplications,
      recentApplications,
    };
  }

  // ─── getReviewerDashboard ─────────────────────────────────────────────────────

  async getReviewerDashboard(userId: string) {
    const [assignedReviews, completedReviews] = await this.database.$transaction([
      this.database.reviewAssignment.count({ where: { reviewerId: userId, isActive: true } }),
      this.database.review.count({ where: { reviewerId: userId, isComplete: true } }),
    ]);

    const recentAssignments = await this.database.reviewAssignment.findMany({
      where: { reviewerId: userId, isActive: true },
      orderBy: { assignedAt: 'desc' },
      take: 5,
      include: {
        application: { select: { id: true, title: true, referenceNumber: true } },
      },
    });

    return {
      assignedReviews,
      completedReviews,
      pendingReviews: assignedReviews - completedReviews,
      recentAssignments: recentAssignments.map((a) => ({
        id: a.id,
        applicationId: a.applicationId,
        applicationTitle: a.application?.title ?? '',
        referenceNumber: a.application?.referenceNumber ?? '',
        isComplete: !a.isActive,
      })),
    };
  }

  // ─── getApplicantSummary (legacy alias) ────────────────────────────────────────

  private async getApplicantSummary(userId: string) {
    return this.getApplicantDashboard(userId);
  }

  // ─── getTenantSummary ─────────────────────────────────────────────────────────

  private async getTenantSummary(tenantId?: string) {
    const where = tenantId ? { tenantId } : {};

    const [
      totalSubmissions,
      pendingScreening,
      pendingReview,
      approved,
      rejected,
      paymentPending,
      activeMonitoring,
    ] = await this.database.$transaction([
      this.database.application.count({ where }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.SCREENING },
      }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.UNDER_REVIEW },
      }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.APPROVED },
      }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.REJECTED },
      }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.PAYMENT_PENDING },
      }),
      this.database.application.count({
        where: { ...where, status: ApplicationStatus.MONITORING_ACTIVE },
      }),
    ]);

    // Reviewer workload
    const reviewerWorkload = await this.database.reviewAssignment.groupBy({
      by: ['reviewerId'],
      where: { isActive: true, ...(tenantId ? { application: { tenantId } } : {}) },
      _count: { reviewerId: true },
    });

    const reviewerIds = reviewerWorkload.map((r) => r.reviewerId);
    const reviewers = await this.database.user.findMany({
      where: { id: { in: reviewerIds } },
      select: { id: true, firstName: true, lastName: true },
    });

    const reviewerMap = new Map(reviewers.map((r) => [r.id, r]));

    const workload = reviewerWorkload.map((r) => ({
      reviewerId: r.reviewerId,
      name: reviewerMap.has(r.reviewerId)
        ? `${reviewerMap.get(r.reviewerId)!.firstName} ${reviewerMap.get(r.reviewerId)!.lastName}`
        : 'Unknown',
      assignedCount: r._count.reviewerId,
    }));

    return {
      totalSubmissions,
      pendingScreening,
      pendingReview,
      approved,
      rejected,
      paymentPending,
      activeMonitoring,
      reviewerWorkload: workload,
    };
  }

  // ─── getRnecSummary ───────────────────────────────────────────────────────────

  async getRnecSummary() {
    const global = await this.getTenantSummary();

    // Per-tenant breakdown
    const tenants = await this.database.tenant.findMany({
      where: { isActive: true },
      select: { id: true, name: true, code: true },
    });

    const tenantBreakdowns = await Promise.all(
      tenants.map(async (tenant) => {
        const counts = await this.database.$transaction([
          this.database.application.count({ where: { tenantId: tenant.id } }),
          this.database.application.count({
            where: { tenantId: tenant.id, status: ApplicationStatus.APPROVED },
          }),
          this.database.application.count({
            where: { tenantId: tenant.id, status: ApplicationStatus.UNDER_REVIEW },
          }),
          this.database.application.count({
            where: { tenantId: tenant.id, status: ApplicationStatus.REJECTED },
          }),
        ]);

        return {
          tenantId: tenant.id,
          tenantName: tenant.name,
          tenantCode: tenant.code,
          total: counts[0],
          approved: counts[1],
          underReview: counts[2],
          rejected: counts[3],
        };
      }),
    );

    return {
      ...global,
      tenantBreakdowns,
    };
  }
}
