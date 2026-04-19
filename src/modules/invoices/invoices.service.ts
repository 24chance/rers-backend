import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationStatus, NotificationType } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── create ──────────────────────────────────────────────────────────────────

  async create(applicationId: string, dto: CreateInvoiceDto) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      select: { id: true, status: true, title: true, applicantId: true },
    });

    if (!application) {
      throw new NotFoundException(`Application "${applicationId}" not found.`);
    }

    const invoice = await this.prisma.invoice.create({
      data: {
        applicationId,
        amount: dto.amount,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        currency: dto.currency ?? 'KES',
      },
      include: {
        application: {
          select: { id: true, referenceNumber: true, title: true },
        },
      },
    });

    // Update application status to PAYMENT_PENDING
    await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: ApplicationStatus.PAYMENT_PENDING },
    });

    await this.prisma.workflowTransition.create({
      data: {
        applicationId,
        fromStatus: application.status,
        toStatus: ApplicationStatus.PAYMENT_PENDING,
        reason: 'Invoice created — payment required',
      },
    });

    // Notify applicant
    await this.prisma.notification.create({
      data: {
        userId: application.applicantId,
        type: NotificationType.PAYMENT_PENDING,
        title: 'Payment Required',
        message: `An invoice of ${dto.currency ?? 'KES'} ${dto.amount} has been issued for your application: ${application.title}`,
        metadata: { applicationId, invoiceId: invoice.id },
      },
    });

    return invoice;
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

    return this.prisma.invoice.findMany({
      where: { applicationId },
      include: {
        payments: {
          select: {
            id: true,
            amount: true,
            status: true,
            method: true,
            referenceNumber: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ─── findAll ─────────────────────────────────────────────────────────────────

  async findAll(tenantId?: string, filters?: { status?: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};

    if (tenantId) {
      where.application = { tenantId };
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.invoice.findMany({
      where,
      include: {
        application: {
          select: {
            id: true,
            referenceNumber: true,
            title: true,
            tenantId: true,
          },
        },
        payments: {
          select: { id: true, amount: true, status: true, createdAt: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
