import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MonitoringStatus, MonitoringType } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateAmendmentDto } from './dto/create-amendment.dto';
import { CreateRenewalDto } from './dto/create-renewal.dto';
import { CreateProgressReportDto } from './dto/create-progress-report.dto';
import { CreateAdverseEventDto } from './dto/create-adverse-event.dto';
import { CreateDeviationDto } from './dto/create-deviation.dto';
import { CreateClosureDto } from './dto/create-closure.dto';

@Injectable()
export class MonitoringService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── ensureApplicationExists ──────────────────────────────────────────────────

  private async ensureApplicationExists(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true },
    });

    if (!application) {
      throw new NotFoundException(`Application "${applicationId}" not found.`);
    }

    return application;
  }

  // ─── createAmendment ─────────────────────────────────────────────────────────

  async createAmendment(
    applicationId: string,
    userId: string,
    dto: CreateAmendmentDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.amendment.create({
      data: {
        applicationId,
        title: dto.title,
        description: dto.description,
        reason: dto.reason,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── createRenewal ────────────────────────────────────────────────────────────

  async createRenewal(
    applicationId: string,
    userId: string,
    dto: CreateRenewalDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.renewal.create({
      data: {
        applicationId,
        justification: dto.justification,
        extensionPeriod: dto.extensionPeriod,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── createProgressReport ─────────────────────────────────────────────────────

  async createProgressReport(
    applicationId: string,
    userId: string,
    dto: CreateProgressReportDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.progressReport.create({
      data: {
        applicationId,
        reportPeriod: dto.reportPeriod,
        summary: dto.summary,
        participantsEnrolled: dto.participantsEnrolled,
        findings: dto.findings,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── createAdverseEvent ───────────────────────────────────────────────────────

  async createAdverseEvent(
    applicationId: string,
    userId: string,
    dto: CreateAdverseEventDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.adverseEvent.create({
      data: {
        applicationId,
        eventDate: new Date(dto.eventDate),
        description: dto.description,
        severity: dto.severity,
        affectedParticipants: dto.affectedParticipants,
        actionTaken: dto.actionTaken,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── createDeviation ──────────────────────────────────────────────────────────

  async createDeviation(
    applicationId: string,
    userId: string,
    dto: CreateDeviationDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.protocolDeviation.create({
      data: {
        applicationId,
        deviationDate: new Date(dto.deviationDate),
        description: dto.description,
        impact: dto.impact,
        correctiveAction: dto.correctiveAction,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── createClosureReport ──────────────────────────────────────────────────────

  async createClosureReport(
    applicationId: string,
    userId: string,
    dto: CreateClosureDto,
  ) {
    await this.ensureApplicationExists(applicationId);

    return this.prisma.closureReport.create({
      data: {
        applicationId,
        closureDate: new Date(dto.closureDate),
        description: dto.description,
        totalEnrolled: dto.totalEnrolled,
        findings: dto.findings,
        status: MonitoringStatus.SUBMITTED,
        submittedAt: new Date(),
      },
    });
  }

  // ─── getByApplication ─────────────────────────────────────────────────────────

  async getByApplication(applicationId: string, type: MonitoringType) {
    await this.ensureApplicationExists(applicationId);

    switch (type) {
      case MonitoringType.AMENDMENT:
        return this.prisma.amendment.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      case MonitoringType.RENEWAL:
        return this.prisma.renewal.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      case MonitoringType.PROGRESS_REPORT:
        return this.prisma.progressReport.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      case MonitoringType.ADVERSE_EVENT:
        return this.prisma.adverseEvent.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      case MonitoringType.PROTOCOL_DEVIATION:
        return this.prisma.protocolDeviation.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      case MonitoringType.CLOSURE_REPORT:
        return this.prisma.closureReport.findMany({
          where: { applicationId },
          orderBy: { createdAt: 'desc' },
        });

      default:
        return [];
    }
  }
}
