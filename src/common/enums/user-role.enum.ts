/**
 * UserRole enum — mirrors the Prisma schema UserRole enum.
 * This local definition is used for DTOs, guards, and decorators so they
 * compile before `prisma generate` has been run.
 *
 * After `prisma generate` the generated types can be used directly, but this
 * local definition ensures type-safety throughout the codebase regardless.
 */
export enum UserRole {
  APPLICANT = 'APPLICANT',
  REVIEWER = 'REVIEWER',
  IRB_ADMIN = 'IRB_ADMIN',
  RNEC_ADMIN = 'RNEC_ADMIN',
  FINANCE_OFFICER = 'FINANCE_OFFICER',
  CHAIRPERSON = 'CHAIRPERSON',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}
