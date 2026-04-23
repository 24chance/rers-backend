import { ApplicationStatus, ApplicationType, DecisionType, DocumentType, MonitoringStatus, NotificationType, PaymentStatus, ReviewRecommendation, SeverityLevel, UserRole } from '../../common/enums';
export declare class Tenant {
    id: string;
    name: string;
    code: string;
    type: string;
    logoUrl: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    isActive: boolean;
    settings: Record<string, unknown> | null;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    applications: Application[];
    institutions: Institution[];
    auditLogs: AuditLog[];
}
export declare class Role {
    id: string;
    name: UserRole;
    description: string | null;
    createdAt: Date;
    users: User[];
    permissions: RolePermission[];
}
export declare class Permission {
    id: string;
    name: string;
    description: string | null;
    resource: string;
    action: string;
    createdAt: Date;
    roles: RolePermission[];
}
export declare class RolePermission {
    roleId: string;
    permissionId: string;
    role: Role;
    permission: Permission;
}
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    isActive: boolean;
    isVerified: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    resetToken: string | null;
    resetExpiresAt: Date | null;
    lastLoginAt: Date | null;
    firstLogin: boolean;
    tenantId: string | null;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
    tenant: Tenant | null;
    role: Role;
    applicantProfile: ApplicantProfile | null;
    applications: Application[];
    reviewAssignments: ReviewAssignment[];
    reviews: Review[];
    notifications: Notification[];
    auditLogs: AuditLog[];
}
export declare class ApplicantProfile {
    id: string;
    userId: string;
    institution: string | null;
    department: string | null;
    position: string | null;
    qualifications: string | null;
    orcidId: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
export declare class Institution {
    id: string;
    name: string;
    code: string;
    type: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    tenantId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenant: Tenant;
    applications: Application[];
}
export declare class Application {
    id: string;
    referenceNumber: string | null;
    title: string;
    type: ApplicationType;
    status: ApplicationStatus;
    tenantId: string | null;
    applicantId: string;
    destinationId: string | null;
    principalInvestigator: string | null;
    coInvestigators: string[];
    studyDuration: string | null;
    studyStartDate: Date | null;
    studyEndDate: Date | null;
    population: string | null;
    sampleSize: number | null;
    methodology: string | null;
    fundingSource: string | null;
    budget: string | null;
    ethicsStatement: string | null;
    consentDescription: string | null;
    formData: Record<string, unknown> | null;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    tenant: Tenant;
    applicant: User;
    destination: Institution | null;
    documents: ApplicationDocument[];
    workflowTransitions: WorkflowTransition[];
    reviewAssignments: ReviewAssignment[];
    reviews: Review[];
    decisions: Decision[];
    certificates: Certificate[];
    invoices: Invoice[];
    queries: Query[];
    amendments: Amendment[];
    renewals: Renewal[];
    progressReports: ProgressReport[];
    adverseEvents: AdverseEvent[];
    protocolDeviations: ProtocolDeviation[];
    closureReports: ClosureReport[];
}
export declare class ApplicationDocument {
    id: string;
    applicationId: string;
    fileName: string;
    originalName: string;
    mimeType: string;
    size: number;
    path: string;
    cloudinaryPublicId: string | null;
    documentType: DocumentType;
    version: number;
    uploadedById: string | null;
    createdAt: Date;
    application: Application;
}
export declare class WorkflowTransition {
    id: string;
    applicationId: string;
    fromStatus: ApplicationStatus | null;
    toStatus: ApplicationStatus;
    actorId: string | null;
    reason: string | null;
    notes: string | null;
    createdAt: Date;
    application: Application;
}
export declare class ReviewAssignment {
    id: string;
    applicationId: string;
    reviewerId: string;
    assignedById: string | null;
    conflictDeclared: boolean;
    conflictReason: string | null;
    isActive: boolean;
    dueDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
    reviewer: User;
}
export declare class Review {
    id: string;
    applicationId: string;
    reviewerId: string;
    comments: string | null;
    recommendation: ReviewRecommendation | null;
    conditions: string | null;
    isComplete: boolean;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
    reviewer: User;
}
export declare class Query {
    id: string;
    applicationId: string;
    raisedById: string | null;
    question: string;
    isResolved: boolean;
    resolvedAt: Date | null;
    createdAt: Date;
    application: Application;
    raisedBy: User | null;
    responses: QueryResponse[];
}
export declare class QueryResponse {
    id: string;
    queryId: string;
    responderId: string | null;
    response: string;
    createdAt: Date;
    query: Query;
    responder: User | null;
}
export declare class Decision {
    id: string;
    applicationId: string;
    type: DecisionType;
    conditions: string | null;
    rationale: string | null;
    decidedById: string | null;
    letterPath: string | null;
    createdAt: Date;
    application: Application;
    certificate: Certificate | null;
}
export declare class Certificate {
    id: string;
    applicationId: string;
    decisionId: string;
    certificateNumber: string;
    verificationToken: string;
    pdfPath: string | null;
    issuedAt: Date;
    expiresAt: Date | null;
    application: Application;
    decision: Decision;
}
export declare class Invoice {
    id: string;
    applicationId: string;
    amount: string;
    currency: string;
    description: string | null;
    dueDate: Date | null;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
    payments: Payment[];
}
export declare class Payment {
    id: string;
    invoiceId: string;
    amount: string;
    method: string | null;
    referenceNumber: string | null;
    status: PaymentStatus;
    verifiedById: string | null;
    verifiedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    invoice: Invoice;
    receipts: Receipt[];
}
export declare class Receipt {
    id: string;
    paymentId: string;
    receiptNumber: string;
    amount: string;
    issuedAt: Date;
    pdfPath: string | null;
    payment: Payment;
}
export declare class Amendment {
    id: string;
    applicationId: string;
    title: string;
    description: string;
    reason: string;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class Renewal {
    id: string;
    applicationId: string;
    extensionPeriod: string | null;
    justification: string;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class ProgressReport {
    id: string;
    applicationId: string;
    reportPeriod: string;
    summary: string;
    participantsEnrolled: number | null;
    findings: string | null;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class AdverseEvent {
    id: string;
    applicationId: string;
    eventDate: Date;
    description: string;
    severity: SeverityLevel;
    affectedParticipants: number | null;
    actionTaken: string | null;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class ProtocolDeviation {
    id: string;
    applicationId: string;
    deviationDate: Date;
    description: string;
    impact: string | null;
    correctiveAction: string | null;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class ClosureReport {
    id: string;
    applicationId: string;
    closureDate: Date;
    description: string;
    totalEnrolled: number | null;
    findings: string | null;
    status: MonitoringStatus;
    submittedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    application: Application;
}
export declare class Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    metadata: Record<string, unknown> | null;
    createdAt: Date;
    user: User;
}
export declare class AuditLog {
    id: string;
    actorId: string | null;
    action: string;
    targetEntity: string;
    targetId: string;
    tenantId: string | null;
    metadata: Record<string, unknown> | null;
    ipAddress: string | null;
    createdAt: Date;
    actor: User | null;
    tenant: Tenant | null;
}
export declare const databaseEntities: (typeof Tenant | typeof Role | typeof Permission | typeof RolePermission | typeof User | typeof ApplicantProfile | typeof Institution | typeof Application | typeof ApplicationDocument | typeof WorkflowTransition | typeof ReviewAssignment | typeof Review | typeof Query | typeof QueryResponse | typeof Decision | typeof Certificate | typeof Invoice | typeof Payment | typeof Receipt | typeof Amendment | typeof Renewal | typeof ProgressReport | typeof AdverseEvent | typeof ProtocolDeviation | typeof ClosureReport | typeof Notification | typeof AuditLog)[];
