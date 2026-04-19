import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── findAll ─────────────────────────────────────────────────────────────────

  async findAll() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        _count: { select: { users: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  // ─── findOne ─────────────────────────────────────────────────────────────────

  async findOne(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
        _count: { select: { users: true } },
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with id "${id}" not found.`);
    }

    return role;
  }

  // ─── assignPermission ────────────────────────────────────────────────────────

  async assignPermission(roleId: string, dto: AssignPermissionDto) {
    await this.findOne(roleId);

    const permission = await this.prisma.permission.findUnique({
      where: { id: dto.permissionId },
    });

    if (!permission) {
      throw new NotFoundException(
        `Permission with id "${dto.permissionId}" not found.`,
      );
    }

    const existing = await this.prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: { roleId, permissionId: dto.permissionId },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Permission "${permission.name}" is already assigned to this role.`,
      );
    }

    await this.prisma.rolePermission.create({
      data: { roleId, permissionId: dto.permissionId },
    });

    return this.findOne(roleId);
  }

  // ─── removePermission ────────────────────────────────────────────────────────

  async removePermission(roleId: string, permId: string) {
    await this.findOne(roleId);

    const existing = await this.prisma.rolePermission.findUnique({
      where: { roleId_permissionId: { roleId, permissionId: permId } },
    });

    if (!existing) {
      throw new NotFoundException(
        `Permission "${permId}" is not assigned to this role.`,
      );
    }

    await this.prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId: permId } },
    });

    return this.findOne(roleId);
  }
}
