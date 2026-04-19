import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ReviewerAssignmentsController } from './reviewer-assignments.controller';
import { ReviewerAssignmentsService } from './reviewer-assignments.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReviewerAssignmentsController],
  providers: [ReviewerAssignmentsService],
  exports: [ReviewerAssignmentsService],
})
export class ReviewerAssignmentsModule {}
