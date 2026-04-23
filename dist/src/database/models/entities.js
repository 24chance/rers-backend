"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseEntities = exports.AuditLog = exports.Notification = exports.ClosureReport = exports.ProtocolDeviation = exports.AdverseEvent = exports.ProgressReport = exports.Renewal = exports.Amendment = exports.Receipt = exports.Payment = exports.Invoice = exports.Certificate = exports.Decision = exports.QueryResponse = exports.Query = exports.Review = exports.ReviewAssignment = exports.WorkflowTransition = exports.ApplicationDocument = exports.Application = exports.Institution = exports.ApplicantProfile = exports.User = exports.RolePermission = exports.Permission = exports.Role = exports.Tenant = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../common/enums");
let Tenant = class Tenant {
    id;
    name;
    code;
    type;
    logoUrl;
    address;
    phone;
    email;
    isActive;
    settings;
    createdAt;
    updatedAt;
    users;
    applications;
    institutions;
    auditLogs;
};
exports.Tenant = Tenant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Tenant.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Tenant.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Tenant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Tenant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tenant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tenant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User, (user) => user.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application, (application) => application.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Institution, (institution) => institution.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "institutions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AuditLog, (auditLog) => auditLog.tenant),
    __metadata("design:type", Array)
], Tenant.prototype, "auditLogs", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)('tenants')
], Tenant);
let Role = class Role {
    id;
    name;
    description;
    createdAt;
    users;
    permissions;
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.UserRole,
        enumName: 'UserRole',
        unique: true,
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User, (user) => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RolePermission, (rolePermission) => rolePermission.role),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles')
], Role);
let Permission = class Permission {
    id;
    name;
    description;
    resource;
    action;
    createdAt;
    roles;
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Permission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permission.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permission.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Permission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RolePermission, (rolePermission) => rolePermission.permission),
    __metadata("design:type", Array)
], Permission.prototype, "roles", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)('permissions')
], Permission);
let RolePermission = class RolePermission {
    roleId;
    permissionId;
    role;
    permission;
};
exports.RolePermission = RolePermission;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], RolePermission.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], RolePermission.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'roleId' }),
    __metadata("design:type", Role)
], RolePermission.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Permission, (permission) => permission.roles, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'permissionId' }),
    __metadata("design:type", Permission)
], RolePermission.prototype, "permission", void 0);
exports.RolePermission = RolePermission = __decorate([
    (0, typeorm_1.Entity)('role_permissions')
], RolePermission);
let User = class User {
    id;
    email;
    passwordHash;
    firstName;
    lastName;
    phone;
    isActive;
    isVerified;
    otpCode;
    otpExpiresAt;
    resetToken;
    resetExpiresAt;
    lastLoginAt;
    firstLogin;
    tenantId;
    roleId;
    createdAt;
    updatedAt;
    tenant;
    role;
    applicantProfile;
    applications;
    reviewAssignments;
    reviews;
    notifications;
    auditLogs;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], User.prototype, "otpCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], User.prototype, "otpExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], User.prototype, "resetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], User.prototype, "resetExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "firstLogin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], User.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tenant, (tenant) => tenant.users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tenantId' }),
    __metadata("design:type", Object)
], User.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: 'roleId' }),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ApplicantProfile, (applicantProfile) => applicantProfile.user),
    __metadata("design:type", Object)
], User.prototype, "applicantProfile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application, (application) => application.applicant),
    __metadata("design:type", Array)
], User.prototype, "applications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReviewAssignment, (reviewAssignment) => reviewAssignment.reviewer),
    __metadata("design:type", Array)
], User.prototype, "reviewAssignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review, (review) => review.reviewer),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AuditLog, (auditLog) => auditLog.actor),
    __metadata("design:type", Array)
], User.prototype, "auditLogs", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
let ApplicantProfile = class ApplicantProfile {
    id;
    userId;
    institution;
    department;
    position;
    qualifications;
    orcidId;
    createdAt;
    updatedAt;
    user;
};
exports.ApplicantProfile = ApplicantProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApplicantProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], ApplicantProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicantProfile.prototype, "institution", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicantProfile.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicantProfile.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicantProfile.prototype, "qualifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicantProfile.prototype, "orcidId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ApplicantProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ApplicantProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User, (user) => user.applicantProfile, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User)
], ApplicantProfile.prototype, "user", void 0);
exports.ApplicantProfile = ApplicantProfile = __decorate([
    (0, typeorm_1.Entity)('applicant_profiles')
], ApplicantProfile);
let Institution = class Institution {
    id;
    name;
    code;
    type;
    address;
    phone;
    email;
    tenantId;
    isActive;
    createdAt;
    updatedAt;
    tenant;
    applications;
};
exports.Institution = Institution;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Institution.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Institution.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Institution.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Institution.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Institution.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Institution.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Institution.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Institution.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Institution.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Institution.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Institution.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tenant, (tenant) => tenant.institutions),
    (0, typeorm_1.JoinColumn)({ name: 'tenantId' }),
    __metadata("design:type", Tenant)
], Institution.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Application, (application) => application.destination),
    __metadata("design:type", Array)
], Institution.prototype, "applications", void 0);
exports.Institution = Institution = __decorate([
    (0, typeorm_1.Entity)('institutions')
], Institution);
let Application = class Application {
    id;
    referenceNumber;
    title;
    type;
    status;
    tenantId;
    applicantId;
    destinationId;
    principalInvestigator;
    coInvestigators;
    studyDuration;
    studyStartDate;
    studyEndDate;
    population;
    sampleSize;
    methodology;
    fundingSource;
    budget;
    ethicsStatement;
    consentDescription;
    formData;
    submittedAt;
    createdAt;
    updatedAt;
    tenant;
    applicant;
    destination;
    documents;
    workflowTransitions;
    reviewAssignments;
    reviews;
    decisions;
    certificates;
    invoices;
    queries;
    amendments;
    renewals;
    progressReports;
    adverseEvents;
    protocolDeviations;
    closureReports;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", Object)
], Application.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ApplicationType,
        enumName: 'ApplicationType',
    }),
    __metadata("design:type", String)
], Application.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ApplicationStatus,
        enumName: 'ApplicationStatus',
        default: enums_1.ApplicationStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Application.prototype, "applicantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "destinationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "principalInvestigator", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: () => 'ARRAY[]::text[]' }),
    __metadata("design:type", Array)
], Application.prototype, "coInvestigators", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "studyDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Application.prototype, "studyStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Application.prototype, "studyEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "population", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Object)
], Application.prototype, "sampleSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "methodology", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "fundingSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Object)
], Application.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "ethicsStatement", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Application.prototype, "consentDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Application.prototype, "formData", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Application.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Application.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tenant, (tenant) => tenant.applications),
    (0, typeorm_1.JoinColumn)({ name: 'tenantId' }),
    __metadata("design:type", Tenant)
], Application.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.applications),
    (0, typeorm_1.JoinColumn)({ name: 'applicantId' }),
    __metadata("design:type", User)
], Application.prototype, "applicant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Institution, (institution) => institution.applications, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'destinationId' }),
    __metadata("design:type", Object)
], Application.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ApplicationDocument, (document) => document.application),
    __metadata("design:type", Array)
], Application.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WorkflowTransition, (workflowTransition) => workflowTransition.application),
    __metadata("design:type", Array)
], Application.prototype, "workflowTransitions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReviewAssignment, (reviewAssignment) => reviewAssignment.application),
    __metadata("design:type", Array)
], Application.prototype, "reviewAssignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review, (review) => review.application),
    __metadata("design:type", Array)
], Application.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Decision, (decision) => decision.application),
    __metadata("design:type", Array)
], Application.prototype, "decisions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Certificate, (certificate) => certificate.application),
    __metadata("design:type", Array)
], Application.prototype, "certificates", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Invoice, (invoice) => invoice.application),
    __metadata("design:type", Array)
], Application.prototype, "invoices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Query, (query) => query.application),
    __metadata("design:type", Array)
], Application.prototype, "queries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Amendment, (amendment) => amendment.application),
    __metadata("design:type", Array)
], Application.prototype, "amendments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Renewal, (renewal) => renewal.application),
    __metadata("design:type", Array)
], Application.prototype, "renewals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProgressReport, (progressReport) => progressReport.application),
    __metadata("design:type", Array)
], Application.prototype, "progressReports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdverseEvent, (adverseEvent) => adverseEvent.application),
    __metadata("design:type", Array)
], Application.prototype, "adverseEvents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProtocolDeviation, (protocolDeviation) => protocolDeviation.application),
    __metadata("design:type", Array)
], Application.prototype, "protocolDeviations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ClosureReport, (closureReport) => closureReport.application),
    __metadata("design:type", Array)
], Application.prototype, "closureReports", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)('applications')
], Application);
let ApplicationDocument = class ApplicationDocument {
    id;
    applicationId;
    fileName;
    originalName;
    mimeType;
    size;
    path;
    cloudinaryPublicId;
    documentType;
    version;
    uploadedById;
    createdAt;
    application;
};
exports.ApplicationDocument = ApplicationDocument;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ApplicationDocument.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicationDocument.prototype, "cloudinaryPublicId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.DocumentType,
        enumName: 'DocumentType',
    }),
    __metadata("design:type", String)
], ApplicationDocument.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ApplicationDocument.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ApplicationDocument.prototype, "uploadedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ApplicationDocument.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.documents, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], ApplicationDocument.prototype, "application", void 0);
exports.ApplicationDocument = ApplicationDocument = __decorate([
    (0, typeorm_1.Entity)('application_documents')
], ApplicationDocument);
let WorkflowTransition = class WorkflowTransition {
    id;
    applicationId;
    fromStatus;
    toStatus;
    actorId;
    reason;
    notes;
    createdAt;
    application;
};
exports.WorkflowTransition = WorkflowTransition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkflowTransition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkflowTransition.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ApplicationStatus,
        enumName: 'ApplicationStatus',
        nullable: true,
    }),
    __metadata("design:type", Object)
], WorkflowTransition.prototype, "fromStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ApplicationStatus,
        enumName: 'ApplicationStatus',
    }),
    __metadata("design:type", String)
], WorkflowTransition.prototype, "toStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], WorkflowTransition.prototype, "actorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], WorkflowTransition.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], WorkflowTransition.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkflowTransition.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.workflowTransitions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], WorkflowTransition.prototype, "application", void 0);
exports.WorkflowTransition = WorkflowTransition = __decorate([
    (0, typeorm_1.Entity)('workflow_transitions')
], WorkflowTransition);
let ReviewAssignment = class ReviewAssignment {
    id;
    applicationId;
    reviewerId;
    assignedById;
    conflictDeclared;
    conflictReason;
    isActive;
    dueDate;
    createdAt;
    updatedAt;
    application;
    reviewer;
};
exports.ReviewAssignment = ReviewAssignment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReviewAssignment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewAssignment.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReviewAssignment.prototype, "reviewerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ReviewAssignment.prototype, "assignedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ReviewAssignment.prototype, "conflictDeclared", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ReviewAssignment.prototype, "conflictReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ReviewAssignment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], ReviewAssignment.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReviewAssignment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReviewAssignment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.reviewAssignments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], ReviewAssignment.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.reviewAssignments),
    (0, typeorm_1.JoinColumn)({ name: 'reviewerId' }),
    __metadata("design:type", User)
], ReviewAssignment.prototype, "reviewer", void 0);
exports.ReviewAssignment = ReviewAssignment = __decorate([
    (0, typeorm_1.Entity)('review_assignments')
], ReviewAssignment);
let Review = class Review {
    id;
    applicationId;
    reviewerId;
    comments;
    recommendation;
    conditions;
    isComplete;
    completedAt;
    createdAt;
    updatedAt;
    application;
    reviewer;
};
exports.Review = Review;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Review.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Review.prototype, "reviewerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Review.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ReviewRecommendation,
        enumName: 'ReviewRecommendation',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Review.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Review.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Review.prototype, "isComplete", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Review.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Review.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.reviews, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Review.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.reviews),
    (0, typeorm_1.JoinColumn)({ name: 'reviewerId' }),
    __metadata("design:type", User)
], Review.prototype, "reviewer", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)('reviews')
], Review);
let Query = class Query {
    id;
    applicationId;
    raisedById;
    question;
    isResolved;
    resolvedAt;
    createdAt;
    application;
    raisedBy;
    responses;
};
exports.Query = Query;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Query.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Query.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Query.prototype, "raisedById", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Query.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Query.prototype, "isResolved", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Query.prototype, "resolvedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Query.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.queries, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Query.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'raisedById' }),
    __metadata("design:type", Object)
], Query.prototype, "raisedBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QueryResponse, (queryResponse) => queryResponse.query),
    __metadata("design:type", Array)
], Query.prototype, "responses", void 0);
exports.Query = Query = __decorate([
    (0, typeorm_1.Entity)('queries')
], Query);
let QueryResponse = class QueryResponse {
    id;
    queryId;
    responderId;
    response;
    createdAt;
    query;
    responder;
};
exports.QueryResponse = QueryResponse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QueryResponse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QueryResponse.prototype, "queryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], QueryResponse.prototype, "responderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QueryResponse.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QueryResponse.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Query, (query) => query.responses, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'queryId' }),
    __metadata("design:type", Query)
], QueryResponse.prototype, "query", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'responderId' }),
    __metadata("design:type", Object)
], QueryResponse.prototype, "responder", void 0);
exports.QueryResponse = QueryResponse = __decorate([
    (0, typeorm_1.Entity)('query_responses')
], QueryResponse);
let Decision = class Decision {
    id;
    applicationId;
    type;
    conditions;
    rationale;
    decidedById;
    letterPath;
    createdAt;
    application;
    certificate;
};
exports.Decision = Decision;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Decision.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Decision.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.DecisionType,
        enumName: 'DecisionType',
    }),
    __metadata("design:type", String)
], Decision.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Decision.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Decision.prototype, "rationale", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Decision.prototype, "decidedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Decision.prototype, "letterPath", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Decision.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.decisions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Decision.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Certificate, (certificate) => certificate.decision),
    __metadata("design:type", Object)
], Decision.prototype, "certificate", void 0);
exports.Decision = Decision = __decorate([
    (0, typeorm_1.Entity)('decisions')
], Decision);
let Certificate = class Certificate {
    id;
    applicationId;
    decisionId;
    certificateNumber;
    verificationToken;
    pdfPath;
    issuedAt;
    expiresAt;
    application;
    decision;
};
exports.Certificate = Certificate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Certificate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Certificate.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Certificate.prototype, "decisionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Certificate.prototype, "certificateNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Certificate.prototype, "verificationToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Certificate.prototype, "pdfPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Certificate.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Certificate.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.certificates, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Certificate.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Decision, (decision) => decision.certificate),
    (0, typeorm_1.JoinColumn)({ name: 'decisionId' }),
    __metadata("design:type", Decision)
], Certificate.prototype, "decision", void 0);
exports.Certificate = Certificate = __decorate([
    (0, typeorm_1.Entity)('certificates')
], Certificate);
let Invoice = class Invoice {
    id;
    applicationId;
    amount;
    currency;
    description;
    dueDate;
    status;
    createdAt;
    updatedAt;
    application;
    payments;
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invoice.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", String)
], Invoice.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: 'KES' }),
    __metadata("design:type", String)
], Invoice.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Invoice.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Invoice.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.PaymentStatus,
        enumName: 'PaymentStatus',
        default: enums_1.PaymentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.invoices, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Invoice.prototype, "application", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Payment, (payment) => payment.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "payments", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)('invoices')
], Invoice);
let Payment = class Payment {
    id;
    invoiceId;
    amount;
    method;
    referenceNumber;
    status;
    verifiedById;
    verifiedAt;
    notes;
    createdAt;
    invoice;
    receipts;
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "invoiceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", String)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Payment.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Payment.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.PaymentStatus,
        enumName: 'PaymentStatus',
        default: enums_1.PaymentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Payment.prototype, "verifiedById", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Payment.prototype, "verifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Payment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Invoice, (invoice) => invoice.payments, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", Invoice)
], Payment.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Receipt, (receipt) => receipt.payment),
    __metadata("design:type", Array)
], Payment.prototype, "receipts", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
let Receipt = class Receipt {
    id;
    paymentId;
    receiptNumber;
    amount;
    issuedAt;
    pdfPath;
    payment;
};
exports.Receipt = Receipt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Receipt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Receipt.prototype, "paymentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Receipt.prototype, "receiptNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", String)
], Receipt.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Receipt.prototype, "issuedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Receipt.prototype, "pdfPath", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Payment, (payment) => payment.receipts),
    (0, typeorm_1.JoinColumn)({ name: 'paymentId' }),
    __metadata("design:type", Payment)
], Receipt.prototype, "payment", void 0);
exports.Receipt = Receipt = __decorate([
    (0, typeorm_1.Entity)('receipts')
], Receipt);
let Amendment = class Amendment {
    id;
    applicationId;
    title;
    description;
    reason;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.Amendment = Amendment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Amendment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Amendment.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Amendment.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Amendment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Amendment.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Amendment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Amendment.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Amendment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Amendment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.amendments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Amendment.prototype, "application", void 0);
exports.Amendment = Amendment = __decorate([
    (0, typeorm_1.Entity)('amendments')
], Amendment);
let Renewal = class Renewal {
    id;
    applicationId;
    extensionPeriod;
    justification;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.Renewal = Renewal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Renewal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Renewal.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], Renewal.prototype, "extensionPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Renewal.prototype, "justification", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Renewal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], Renewal.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Renewal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Renewal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.renewals, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], Renewal.prototype, "application", void 0);
exports.Renewal = Renewal = __decorate([
    (0, typeorm_1.Entity)('renewals')
], Renewal);
let ProgressReport = class ProgressReport {
    id;
    applicationId;
    reportPeriod;
    summary;
    participantsEnrolled;
    findings;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.ProgressReport = ProgressReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProgressReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProgressReport.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProgressReport.prototype, "reportPeriod", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProgressReport.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Object)
], ProgressReport.prototype, "participantsEnrolled", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ProgressReport.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ProgressReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], ProgressReport.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProgressReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProgressReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.progressReports, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], ProgressReport.prototype, "application", void 0);
exports.ProgressReport = ProgressReport = __decorate([
    (0, typeorm_1.Entity)('progress_reports')
], ProgressReport);
let AdverseEvent = class AdverseEvent {
    id;
    applicationId;
    eventDate;
    description;
    severity;
    affectedParticipants;
    actionTaken;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.AdverseEvent = AdverseEvent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AdverseEvent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdverseEvent.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AdverseEvent.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdverseEvent.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.SeverityLevel,
        enumName: 'SeverityLevel',
    }),
    __metadata("design:type", String)
], AdverseEvent.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Object)
], AdverseEvent.prototype, "affectedParticipants", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], AdverseEvent.prototype, "actionTaken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], AdverseEvent.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], AdverseEvent.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdverseEvent.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AdverseEvent.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.adverseEvents, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], AdverseEvent.prototype, "application", void 0);
exports.AdverseEvent = AdverseEvent = __decorate([
    (0, typeorm_1.Entity)('adverse_events')
], AdverseEvent);
let ProtocolDeviation = class ProtocolDeviation {
    id;
    applicationId;
    deviationDate;
    description;
    impact;
    correctiveAction;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.ProtocolDeviation = ProtocolDeviation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProtocolDeviation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProtocolDeviation.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ProtocolDeviation.prototype, "deviationDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProtocolDeviation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ProtocolDeviation.prototype, "impact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ProtocolDeviation.prototype, "correctiveAction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ProtocolDeviation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], ProtocolDeviation.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProtocolDeviation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProtocolDeviation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.protocolDeviations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], ProtocolDeviation.prototype, "application", void 0);
exports.ProtocolDeviation = ProtocolDeviation = __decorate([
    (0, typeorm_1.Entity)('protocol_deviations')
], ProtocolDeviation);
let ClosureReport = class ClosureReport {
    id;
    applicationId;
    closureDate;
    description;
    totalEnrolled;
    findings;
    status;
    submittedAt;
    createdAt;
    updatedAt;
    application;
};
exports.ClosureReport = ClosureReport;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClosureReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClosureReport.prototype, "applicationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ClosureReport.prototype, "closureDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ClosureReport.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'int' }),
    __metadata("design:type", Object)
], ClosureReport.prototype, "totalEnrolled", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], ClosureReport.prototype, "findings", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MonitoringStatus,
        enumName: 'MonitoringStatus',
        default: enums_1.MonitoringStatus.DRAFT,
    }),
    __metadata("design:type", String)
], ClosureReport.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Object)
], ClosureReport.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ClosureReport.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ClosureReport.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Application, (application) => application.closureReports, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'applicationId' }),
    __metadata("design:type", Application)
], ClosureReport.prototype, "application", void 0);
exports.ClosureReport = ClosureReport = __decorate([
    (0, typeorm_1.Entity)('closure_reports')
], ClosureReport);
let Notification = class Notification {
    id;
    userId;
    type;
    title;
    message;
    isRead;
    metadata;
    createdAt;
    user;
};
exports.Notification = Notification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Notification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.NotificationType,
        enumName: 'NotificationType',
    }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Notification.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.notifications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User)
], Notification.prototype, "user", void 0);
exports.Notification = Notification = __decorate([
    (0, typeorm_1.Entity)('notifications')
], Notification);
let AuditLog = class AuditLog {
    id;
    actorId;
    action;
    targetEntity;
    targetId;
    tenantId;
    metadata;
    ipAddress;
    createdAt;
    actor;
    tenant;
};
exports.AuditLog = AuditLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AuditLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], AuditLog.prototype, "actorId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuditLog.prototype, "targetEntity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AuditLog.prototype, "targetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], AuditLog.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AuditLog.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", Object)
], AuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AuditLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.auditLogs, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'actorId' }),
    __metadata("design:type", Object)
], AuditLog.prototype, "actor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tenant, (tenant) => tenant.auditLogs, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'tenantId' }),
    __metadata("design:type", Object)
], AuditLog.prototype, "tenant", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, typeorm_1.Entity)('audit_logs')
], AuditLog);
exports.databaseEntities = [
    Tenant,
    Role,
    Permission,
    RolePermission,
    User,
    ApplicantProfile,
    Institution,
    Application,
    ApplicationDocument,
    WorkflowTransition,
    ReviewAssignment,
    Review,
    Query,
    QueryResponse,
    Decision,
    Certificate,
    Invoice,
    Payment,
    Receipt,
    Amendment,
    Renewal,
    ProgressReport,
    AdverseEvent,
    ProtocolDeviation,
    ClosureReport,
    Notification,
    AuditLog,
];
//# sourceMappingURL=entities.js.map