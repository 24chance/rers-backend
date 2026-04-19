import { Injectable } from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { UserRole } from '../../common/enums/user-role.enum';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class DashboardsService {
  constructor(private readonly prisma: PrismaService) {}

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

  // ─── getApplicantSummary ──────────────────────────────────────────────────────

  private async getApplicantSummary(userId: string) {
    const [
      totalSubmissions,
      pendingScreening,
      pendingReview,
      approved,
      rejected,
      paymentPending,
    ] = await this.prisma.$transaction([
      this.prisma.application.count({ where: { applicantId: userId } }),
      this.prisma.application.count({
        where: { applicantId: userId, status: ApplicationStatus.SCREENING },
      }),
      this.prisma.application.count({
        where: { applicantId: userId, status: ApplicationStatus.UNDER_REVIEW },
      }),
      this.prisma.application.count({
        where: { applicantId: userId, status: ApplicationStatus.APPROVED },
      }),
      this.prisma.application.count({
        where: { applicantId: userId, status: ApplicationStatus.REJECTED },
      }),
      this.prisma.application.count({
        where: { applicantId: userId, status: ApplicationStatus.PAYMENT_PENDING },
      }),
    ]);

    return {
      totalSubmissions,
      pendingScreening,
      pendingReview,
      approved,
      rejected,
      paymentPending,
      activeMonitoring: 0,
      reviewerWorkload: [],
    };
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
    ] = await this.prisma.$transaction([
      this.prisma.application.count({ where }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.SCREENING },
      }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.UNDER_REVIEW },
      }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.APPROVED },
      }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.REJECTED },
      }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.PAYMENT_PENDING },
      }),
      this.prisma.application.count({
        where: { ...where, status: ApplicationStatus.MONITORING_ACTIVE },
      }),
    ]);

    // Reviewer workload
    const reviewerWorkload = await this.prisma.reviewAssignment.groupBy({
      by: ['reviewerId'],
      where: { isActive: true, ...(tenantId ? { application: { tenantId } } : {}) },
      _count: { reviewerId: true },
    });

    const reviewerIds = reviewerWorkload.map((r) => r.reviewerId);
    const reviewers = await this.prisma.user.findMany({
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
    const tenants = await this.prisma.tenant.findMany({
      where: { isActive: true },
      select: { id: true, name: true, code: true },
    });

    const tenantBreakdowns = await Promise.all(
      tenants.map(async (tenant) => {
        const counts = await this.prisma.$transaction([
          this.prisma.application.count({ where: { tenantId: tenant.id } }),
          this.prisma.application.count({
            where: { tenantId: tenant.id, status: ApplicationStatus.APPROVED },
          }),
          this.prisma.application.count({
            where: { tenantId: tenant.id, status: ApplicationStatus.UNDER_REVIEW },
          }),
          this.prisma.application.count({
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
