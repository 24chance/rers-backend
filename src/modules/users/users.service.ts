import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '../../common/enums/user-role.enum';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtPayload } from '../../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

export interface FindAllQuery {
  page?: number;
  pageSize?: number;
  tenantId?: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── findAll ─────────────────────────────────────────────────────────────────

  async findAll(query: FindAllQuery, requestingUser: JwtPayload) {
    const page = Math.max(1, query.page ?? DEFAULT_PAGE);
    const pageSize = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, query.pageSize ?? DEFAULT_PAGE_SIZE),
    );

    // IRB_ADMIN can only see users in their own tenant
    const tenantFilter: string | undefined =
      requestingUser.role === UserRole.IRB_ADMIN
        ? (requestingUser.tenantId ?? undefined)
        : (query.tenantId ?? undefined);

    const where = tenantFilter ? { tenantId: tenantFilter } : {};

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          phone: true,
          isActive: true,
          isVerified: true,
          lastLoginAt: true,
          tenantId: true,
          createdAt: true,
          updatedAt: true,
          role: { select: { id: true, name: true } },
          tenant: { select: { id: true, name: true, code: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
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
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        isActive: true,
        isVerified: true,
        lastLoginAt: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
        role: { select: { id: true, name: true } },
        tenant: { select: { id: true, name: true, code: true, type: true } },
        applicantProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found.`);
    }

    return user;
  }

  // ─── update ──────────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id); // ensure the user exists

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.firstName !== undefined && { firstName: dto.firstName }),
        ...(dto.lastName !== undefined && { lastName: dto.lastName }),
        ...(dto.phone !== undefined && { phone: dto.phone }),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        isActive: true,
        isVerified: true,
        tenantId: true,
        updatedAt: true,
        role: { select: { id: true, name: true } },
      },
    });

    return updated;
  }

  // ─── updateRole ───────────────────────────────────────────────────────────────

  async updateRole(id: string, dto: UpdateRoleDto) {
    await this.findOne(id); // ensure the user exists

    const role = await this.prisma.role.findUnique({
      where: { name: dto.role },
    });

    if (!role) {
      throw new BadRequestException(
        `Role "${dto.role}" has not been seeded in the database.`,
      );
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { roleId: role.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        updatedAt: true,
        role: { select: { id: true, name: true } },
      },
    });

    return updated;
  }

  // ─── remove ──────────────────────────────────────────────────────────────────

  async remove(id: string) {
    await this.findOne(id); // ensure the user exists

    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });

    return { message: `User "${id}" has been deactivated.` };
  }
}
