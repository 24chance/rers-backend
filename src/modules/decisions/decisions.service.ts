import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationStatus, DecisionType, NotificationType } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDecisionDto } from './dto/create-decision.dto';
import { CertificatesService } from '../certificates/certificates.service';

@Injectable()
export class DecisionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly certificatesService: CertificatesService,
  ) {}

  // ─── record ──────────────────────────────────────────────────────────────────

  async record(
    applicationId: string,
    actorId: string,
    dto: CreateDecisionDto,
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true, title: true, applicantId: true },
    });

    if (!application) {
      throw new NotFoundException(`Application "${applicationId}" not found.`);
    }

    // Map decision type to application status
    const statusMap: Record<DecisionType, ApplicationStatus> = {
      [DecisionType.APPROVED]: ApplicationStatus.APPROVED,
      [DecisionType.CONDITIONALLY_APPROVED]: ApplicationStatus.CONDITIONALLY_APPROVED,
      [DecisionType.REJECTED]: ApplicationStatus.REJECTED,
      [DecisionType.DEFERRED]: ApplicationStatus.DECISION_PENDING,
    };

    const newStatus = statusMap[dto.type];

    const decision = await this.prisma.decision.create({
      data: {
        applicationId,
        type: dto.type,
        conditions: dto.conditions,
        rationale: dto.rationale,
        decidedById: actorId,
      },
      include: {
        application: {
          select: { id: true, referenceNumber: true, title: true },
        },
      },
    });

    // Update application status
    await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });

    // Record workflow transition
    await this.prisma.workflowTransition.create({
      data: {
        applicationId,
        fromStatus: application.status,
        toStatus: newStatus,
        actorId,
        reason: `Decision issued: ${dto.type}`,
        notes: dto.rationale,
      },
    });

    // Notify applicant
    await this.prisma.notification.create({
      data: {
        userId: application.applicantId,
        type: NotificationType.DECISION_ISSUED,
        title: 'Decision Issued on Your Application',
        message: `A decision of "${dto.type}" has been issued for your application: ${application.title}`,
        metadata: { applicationId, decisionId: decision.id, type: dto.type },
      },
    });

    // If APPROVED, generate certificate automatically
    if (dto.type === DecisionType.APPROVED) {
      await this.certificatesService.generate(applicationId, decision.id);

      // Notify applicant about certificate
      await this.prisma.notification.create({
        data: {
          userId: application.applicantId,
          type: NotificationType.CERTIFICATE_AVAILABLE,
          title: 'Ethics Certificate Available',
          message: `Your ethics certificate for "${application.title}" is now available for download.`,
          metadata: { applicationId, decisionId: decision.id },
        },
      });
    }

    return decision;
  }

  // ─── findByApplication ────────────────────────────────────────────────────────

  async findByApplication(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true },
    });

    if (!application) {
      throw new NotFoundException(`Application "${applicationId}" not found.`);
    }

    return this.prisma.decision.findMany({
      where: { applicationId },
      include: {
        certificate: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const decision = await this.prisma.decision.findUnique({
      where: { id },
      include: {
        application: {
          select: { id: true, referenceNumber: true, title: true, status: true },
        },
        certificate: true,
      },
    });

    if (!decision) {
      throw new NotFoundException(`Decision "${id}" not found.`);
    }

    return decision;
  }
}
