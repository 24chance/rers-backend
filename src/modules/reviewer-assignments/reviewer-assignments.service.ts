import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { NotificationType } from '@prisma/client';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class ReviewerAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── assign ──────────────────────────────────────────────────────────────────

  async assign(assignedById: string, dto: CreateAssignmentDto) {
    const application = await this.prisma.application.findUnique({
      where: { id: dto.applicationId },
      select: { id: true, status: true, title: true },
    });

    if (!application) {
      throw new NotFoundException(
        `Application "${dto.applicationId}" not found.`,
      );
    }

    const reviewer = await this.prisma.user.findUnique({
      where: { id: dto.reviewerId },
      select: { id: true, firstName: true, lastName: true, email: true },
    });

    if (!reviewer) {
      throw new NotFoundException(`Reviewer "${dto.reviewerId}" not found.`);
    }

    // Check for existing active assignment
    const existing = await this.prisma.reviewAssignment.findFirst({
      where: {
        applicationId: dto.applicationId,
        reviewerId: dto.reviewerId,
        isActive: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'This reviewer is already actively assigned to this application.',
      );
    }

    const assignment = await this.prisma.reviewAssignment.create({
      data: {
        applicationId: dto.applicationId,
        reviewerId: dto.reviewerId,
        assignedById,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      },
      include: {
        application: { select: { id: true, title: true, referenceNumber: true } },
        reviewer: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    // Move application to UNDER_REVIEW if not already
    if (
      application.status !== ApplicationStatus.UNDER_REVIEW &&
      application.status !== ApplicationStatus.APPROVED &&
      application.status !== ApplicationStatus.CONDITIONALLY_APPROVED
    ) {
      await this.prisma.application.update({
        where: { id: dto.applicationId },
        data: { status: ApplicationStatus.UNDER_REVIEW },
      });

      await this.prisma.workflowTransition.create({
        data: {
          applicationId: dto.applicationId,
          fromStatus: application.status,
          toStatus: ApplicationStatus.UNDER_REVIEW,
          actorId: assignedById,
          reason: 'Reviewer assigned — application moved to UNDER_REVIEW',
        },
      });
    }

    // Notify reviewer
    await this.prisma.notification.create({
      data: {
        userId: dto.reviewerId,
        type: NotificationType.REVIEWER_ASSIGNED,
        title: 'New Review Assignment',
        message: `You have been assigned to review application: ${application.title}`,
        metadata: { applicationId: dto.applicationId },
      },
    });

    return assignment;
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

    return this.prisma.reviewAssignment.findMany({
      where: { applicationId },
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── findByReviewer ──────────────────────────────────────────────────────────

  async findByReviewer(reviewerId: string) {
    return this.prisma.reviewAssignment.findMany({
      where: { reviewerId },
      include: {
        application: {
          select: {
            id: true,
            referenceNumber: true,
            title: true,
            type: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── declareConflict ──────────────────────────────────────────────────────────

  async declareConflict(
    assignmentId: string,
    reviewerId: string,
    reason: string,
  ) {
    const assignment = await this.prisma.reviewAssignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment "${assignmentId}" not found.`);
    }

    if (assignment.reviewerId !== reviewerId) {
      throw new ForbiddenException(
        'You can only declare conflict on your own assignments.',
      );
    }

    if (assignment.conflictDeclared) {
      throw new BadRequestException(
        'Conflict has already been declared for this assignment.',
      );
    }

    return this.prisma.reviewAssignment.update({
      where: { id: assignmentId },
      data: {
        conflictDeclared: true,
        conflictReason: reason,
        isActive: false,
      },
    });
  }

  // ─── deactivate ───────────────────────────────────────────────────────────────

  async deactivate(assignmentId: string, adminId: string) {
    const assignment = await this.prisma.reviewAssignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment "${assignmentId}" not found.`);
    }

    if (!assignment.isActive) {
      throw new BadRequestException('Assignment is already inactive.');
    }

    return this.prisma.reviewAssignment.update({
      where: { id: assignmentId },
      data: { isActive: false },
    });
  }
}
