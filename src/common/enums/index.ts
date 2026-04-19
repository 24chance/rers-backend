/**
 * Re-exports all Prisma-generated enums so feature modules can import from a
 * single barrel rather than directly from '@prisma/client'.
 *
 * Example:
 *   import { UserRole, ApplicationStatus } from '../common/enums';
 */
export {
  UserRole,
  ApplicationStatus,
  ApplicationType,
  ReviewRecommendation,
  DecisionType,
  DocumentType,
  PaymentStatus,
  MonitoringType,
  NotificationType,
  MonitoringStatus,
  SeverityLevel,
} from '@prisma/client';
