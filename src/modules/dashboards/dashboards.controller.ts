import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser, JwtPayload } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { DashboardsService } from './dashboards.service';

@ApiTags('dashboards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboards')
export class DashboardsController {
  constructor(private readonly dashboardsService: DashboardsService) {}

  // GET /dashboards/summary
  @Get('summary')
  @ApiOperation({ summary: 'Get role-scoped dashboard summary (authenticated)' })
  @ApiResponse({ status: 200, description: 'Dashboard summary returned.' })
  getSummary(@CurrentUser() user: JwtPayload) {
    return this.dashboardsService.getSummary(user.role, user.id, user.tenantId);
  }

  // GET /dashboards/rnec
  @Roles(UserRole.RNEC_ADMIN, UserRole.SYSTEM_ADMIN)
  @Get('rnec')
  @ApiOperation({ summary: 'Full cross-tenant dashboard (RNEC_ADMIN only)' })
  @ApiResponse({ status: 200, description: 'Cross-tenant summary returned.' })
  getRnecSummary() {
    return this.dashboardsService.getRnecSummary();
  }
}
