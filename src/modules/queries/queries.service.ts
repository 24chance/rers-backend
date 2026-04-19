import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { RespondQueryDto } from './dto/respond-query.dto';

@Injectable()
export class QueriesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── raiseQuery ───────────────────────────────────────────────────────────────

  async raiseQuery(applicationId: string, adminId: string, dto: CreateQueryDto) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with id "${applicationId}" not found.`,
      );
    }

    const query = await this.prisma.query.create({
      data: {
        applicationId,
        raisedById: adminId,
        question: dto.question,
      },
      include: { responses: true },
    });

    // Update application status to QUERY_RAISED if not already
    if (application.status !== ApplicationStatus.QUERY_RAISED) {
      await this.prisma.application.update({
        where: { id: applicationId },
        data: { status: ApplicationStatus.QUERY_RAISED },
      });

      await this.prisma.workflowTransition.create({
        data: {
          applicationId,
          fromStatus: application.status,
          toStatus: ApplicationStatus.QUERY_RAISED,
          actorId: adminId,
          reason: 'Query raised by admin',
        },
      });
    }

    return query;
  }

  // ─── findByApplication ────────────────────────────────────────────────────────

  async findByApplication(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with id "${applicationId}" not found.`,
      );
    }

    return this.prisma.query.findMany({
      where: { applicationId },
      include: {
        responses: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── respondToQuery ───────────────────────────────────────────────────────────

  async respondToQuery(
    applicationId: string,
    queryId: string,
    userId: string,
    dto: RespondQueryDto,
  ) {
    const query = await this.prisma.query.findFirst({
      where: { id: queryId, applicationId },
    });

    if (!query) {
      throw new NotFoundException(
        `Query with id "${queryId}" not found on application "${applicationId}".`,
      );
    }

    if (query.isResolved) {
      throw new BadRequestException(
        `Query "${queryId}" is already resolved and cannot receive new responses.`,
      );
    }

    const response = await this.prisma.queryResponse.create({
      data: {
        queryId,
        responderId: userId,
        response: dto.response,
      },
    });

    // Update the application status to RESPONSE_RECEIVED
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { status: true },
    });

    if (application && application.status === ApplicationStatus.QUERY_RAISED) {
      await this.prisma.application.update({
        where: { id: applicationId },
        data: { status: ApplicationStatus.RESPONSE_RECEIVED },
      });

      await this.prisma.workflowTransition.create({
        data: {
          applicationId,
          fromStatus: ApplicationStatus.QUERY_RAISED,
          toStatus: ApplicationStatus.RESPONSE_RECEIVED,
          actorId: userId,
          reason: 'Response submitted by applicant',
        },
      });
    }

    return response;
  }

  // ─── resolveQuery ─────────────────────────────────────────────────────────────

  async resolveQuery(applicationId: string, queryId: string) {
    const query = await this.prisma.query.findFirst({
      where: { id: queryId, applicationId },
    });

    if (!query) {
      throw new NotFoundException(
        `Query with id "${queryId}" not found on application "${applicationId}".`,
      );
    }

    if (query.isResolved) {
      throw new BadRequestException(
        `Query "${queryId}" is already resolved.`,
      );
    }

    return this.prisma.query.update({
      where: { id: queryId },
      data: { isResolved: true, resolvedAt: new Date() },
      include: { responses: { orderBy: { createdAt: 'asc' } } },
    });
  }
}
