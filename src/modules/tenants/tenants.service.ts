import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { QueryTenantDto } from './dto/query-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── create ──────────────────────────────────────────────────────────────────

  async create(dto: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({
      where: { code: dto.code },
    });

    if (existing) {
      throw new ConflictException(
        `A tenant with code "${dto.code}" already exists.`,
      );
    }

    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        code: dto.code,
        type: dto.type,
        logoUrl: dto.logoUrl,
        address: dto.address,
        phone: dto.phone,
        email: dto.email,
        isActive: dto.isActive ?? true,
        settings: dto.settings ?? undefined,
      },
    });
  }

  // ─── findAll ─────────────────────────────────────────────────────────────────

  async findAll(query: QueryTenantDto) {
    const page = Math.max(1, parseInt(query.page ?? '1', 10) || DEFAULT_PAGE);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(query.pageSize ?? '20', 10) || DEFAULT_PAGE_SIZE),
    );

    const where: Record<string, unknown> = {};

    if (query.isActive !== undefined) {
      where.isActive = query.isActive === 'true';
    }

    if (query.type) {
      where.type = query.type;
    }

    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    const [tenants, total] = await this.prisma.$transaction([
      this.prisma.tenant.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { users: true, applications: true, institutions: true },
          },
        },
      }),
      this.prisma.tenant.count({ where }),
    ]);

    return {
      data: tenants,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: true, applications: true, institutions: true },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with id "${id}" not found.`);
    }

    return tenant;
  }

  // ─── update ──────────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateTenantDto) {
    await this.findOne(id);

    return this.prisma.tenant.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.logoUrl !== undefined && { logoUrl: dto.logoUrl }),
        ...(dto.address !== undefined && { address: dto.address }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
        ...(dto.email !== undefined && { email: dto.email }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        ...(dto.settings !== undefined && { settings: dto.settings }),
      },
      include: {
        _count: {
          select: { users: true, applications: true, institutions: true },
        },
      },
    });
  }

  // ─── remove ──────────────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.tenant.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: `Tenant "${id}" has been deactivated.` };
  }

  // ─── getTenantStats ───────────────────────────────────────────────────────────

  async getTenantStats(id: string) {
    await this.findOne(id);

    const [
      totalUsers,
      totalApplications,
      totalInstitutions,
      applicationsByStatus,
    ] = await this.prisma.$transaction([
      this.prisma.user.count({ where: { tenantId: id } }),
      this.prisma.application.count({ where: { tenantId: id } }),
      this.prisma.institution.count({ where: { tenantId: id } }),
      this.prisma.application.groupBy({
        by: ['status'],
        where: { tenantId: id },
        _count: { status: true },
      }),
    ]);

    return {
      tenantId: id,
      totalUsers,
      totalApplications,
      totalInstitutions,
      applicationsByStatus: applicationsByStatus.map((s) => ({
        status: s.status,
        count: s._count.status,
      })),
    };
  }
}
