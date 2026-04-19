import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { SubmitReviewDto } from './dto/submit-review.dto';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // POST /reviews
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Start a review for an assigned application' })
  @ApiResponse({ status: 201, description: 'Review started.' })
  @ApiResponse({ status: 400, description: 'Already started.' })
  @ApiResponse({ status: 403, description: 'No active assignment.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  startReview(
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reviewsService.startReview(dto.applicationId, user.id);
  }

  // GET /reviews/application/:applicationId
  @Get('application/:applicationId')
  @ApiOperation({ summary: 'Get all reviews for an application' })
  @ApiParam({ name: 'applicationId', description: 'Application UUID' })
  @ApiResponse({ status: 200, description: 'Reviews returned.' })
  findByApplication(@Param('applicationId') applicationId: string) {
    return this.reviewsService.findByApplication(applicationId);
  }

  // GET /reviews/reviewer/:reviewerId
  @Get('reviewer/:reviewerId')
  @ApiOperation({ summary: "Get a reviewer's own reviews" })
  @ApiParam({ name: 'reviewerId', description: 'Reviewer UUID' })
  @ApiResponse({ status: 200, description: 'Reviews returned.' })
  findByReviewer(@Param('reviewerId') reviewerId: string) {
    return this.reviewsService.findByReviewer(reviewerId);
  }

  // GET /reviews/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get a single review (reviewer only)' })
  @ApiParam({ name: 'id', description: 'Review UUID' })
  @ApiResponse({ status: 200, description: 'Review returned.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.reviewsService.findOne(id, user.id);
  }

  // PATCH /reviews/:id/submit
  @Patch(':id/submit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit a completed review' })
  @ApiParam({ name: 'id', description: 'Review UUID' })
  @ApiResponse({ status: 200, description: 'Review submitted.' })
  @ApiResponse({ status: 400, description: 'Already submitted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  submitReview(
    @Param('id') id: string,
    @Body() dto: SubmitReviewDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reviewsService.submitReview(id, user.id, dto);
  }
}
