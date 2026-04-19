import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SubmitReviewDto } from './dto/submit-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── startReview ─────────────────────────────────────────────────────────────

  async startReview(applicationId: string, reviewerId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true },
    });

    if (!application) {
      throw new NotFoundException(`Application "${applicationId}" not found.`);
    }

    // Verify reviewer has an active assignment for this application
    const assignment = await this.prisma.reviewAssignment.findFirst({
      where: {
        applicationId,
        reviewerId,
        isActive: true,
        conflictDeclared: false,
      },
    });

    if (!assignment) {
      throw new ForbiddenException(
        'You do not have an active assignment for this application.',
      );
    }

    // Check if review already exists
    const existing = await this.prisma.review.findFirst({
      where: { applicationId, reviewerId },
    });

    if (existing) {
      throw new BadRequestException(
        'You have already started a review for this application.',
      );
    }

    return this.prisma.review.create({
      data: {
        applicationId,
        reviewerId,
      },
      include: this.defaultInclude(),
    });
  }

  // ─── submitReview ────────────────────────────────────────────────────────────

  async submitReview(
    reviewId: string,
    reviewerId: string,
    dto: SubmitReviewDto,
  ) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException(`Review "${reviewId}" not found.`);
    }

    if (review.reviewerId !== reviewerId) {
      throw new ForbiddenException('You can only submit your own reviews.');
    }

    if (review.isComplete) {
      throw new BadRequestException('This review has already been submitted.');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        comments: dto.comments,
        recommendation: dto.recommendation,
        conditions: dto.conditions,
        isComplete: true,
        completedAt: new Date(),
      },
      include: this.defaultInclude(),
    });
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

    return this.prisma.review.findMany({
      where: { applicationId },
      include: this.defaultInclude(),
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── findByReviewer ──────────────────────────────────────────────────────────

  async findByReviewer(reviewerId: string) {
    return this.prisma.review.findMany({
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

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(id: string, reviewerId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: this.defaultInclude(),
    });

    if (!review) {
      throw new NotFoundException(`Review "${id}" not found.`);
    }

    if (review.reviewerId !== reviewerId) {
      throw new ForbiddenException('You do not have access to this review.');
    }

    return review;
  }

  // ─── defaultInclude ──────────────────────────────────────────────────────────

  private defaultInclude() {
    return {
      reviewer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      application: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          type: true,
          status: true,
        },
      },
    };
  }
}
