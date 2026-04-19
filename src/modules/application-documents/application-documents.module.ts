import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ApplicationDocumentsController } from './application-documents.controller';
import { ApplicationDocumentsService } from './application-documents.service';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      // Default dest — overridden per-route in the controller via diskStorage
      dest: './uploads',
    }),
  ],
  controllers: [ApplicationDocumentsController],
  providers: [ApplicationDocumentsService],
  exports: [ApplicationDocumentsService],
})
export class ApplicationDocumentsModule {}
