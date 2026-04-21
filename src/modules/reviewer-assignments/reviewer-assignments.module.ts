import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { ReviewerAssignmentsController } from './reviewer-assignments.controller';
import { ReviewerAssignmentsService } from './reviewer-assignments.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewerAssignmentsController],
  providers: [ReviewerAssignmentsService],
  exports: [ReviewerAssignmentsService],
})
export class ReviewerAssignmentsModule {}
