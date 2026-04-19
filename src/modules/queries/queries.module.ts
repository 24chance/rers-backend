import { Module } from '@nestjs/common';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';

@Module({
  imports: [PrismaModule],
  controllers: [QueriesController],
  providers: [QueriesService],
  exports: [QueriesService],
})
export class QueriesModule {}
