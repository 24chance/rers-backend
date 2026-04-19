import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ReceiptsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── create ──────────────────────────────────────────────────────────────────

  async create(paymentId: string, amount: number) {
    const receiptNumber = await this.generateReceiptNumber();

    return this.prisma.receipt.create({
      data: {
        paymentId,
        receiptNumber,
        amount,
        issuedAt: new Date(),
      },
      include: {
        payment: {
          select: {
            id: true,
            invoiceId: true,
            amount: true,
            method: true,
            referenceNumber: true,
          },
        },
      },
    });
  }

  // ─── findByPayment ────────────────────────────────────────────────────────────

  async findByPayment(paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      select: { id: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment "${paymentId}" not found.`);
    }

    return this.prisma.receipt.findFirst({
      where: { paymentId },
      include: {
        payment: {
          select: {
            id: true,
            invoiceId: true,
            amount: true,
            method: true,
            referenceNumber: true,
          },
        },
      },
    });
  }

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const receipt = await this.prisma.receipt.findUnique({
      where: { id },
      include: {
        payment: {
          select: {
            id: true,
            invoiceId: true,
            amount: true,
            method: true,
            referenceNumber: true,
            invoice: {
              select: {
                id: true,
                applicationId: true,
                amount: true,
                currency: true,
              },
            },
          },
        },
      },
    });

    if (!receipt) {
      throw new NotFoundException(`Receipt "${id}" not found.`);
    }

    return receipt;
  }

  // ─── findAll ─────────────────────────────────────────────────────────────────

  async findAll(filters?: { paymentId?: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};

    if (filters?.paymentId) {
      where.paymentId = filters.paymentId;
    }

    return this.prisma.receipt.findMany({
      where,
      include: {
        payment: {
          select: {
            id: true,
            invoiceId: true,
            amount: true,
            method: true,
            referenceNumber: true,
          },
        },
      },
      orderBy: { issuedAt: 'desc' },
    });
  }

  // ─── generateReceiptNumber ────────────────────────────────────────────────────

  private async generateReceiptNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const prefix = `RCPT-${year}-`;

    const count = await this.prisma.receipt.count({
      where: { receiptNumber: { startsWith: prefix } },
    });

    const sequence = String(count + 1).padStart(4, '0');
    return `${prefix}${sequence}`;
  }
}
