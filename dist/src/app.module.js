"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const configuration_1 = __importDefault(require("./config/configuration"));
const database_module_1 = require("./common/database/database.module");
const email_module_1 = require("./common/email/email.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const auth_module_1 = require("./modules/auth/auth.module");
const bootstrap_module_1 = require("./modules/bootstrap/bootstrap.module");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const institutions_module_1 = require("./modules/institutions/institutions.module");
const workflows_module_1 = require("./modules/workflows/workflows.module");
const applications_module_1 = require("./modules/applications/applications.module");
const application_documents_module_1 = require("./modules/application-documents/application-documents.module");
const queries_module_1 = require("./modules/queries/queries.module");
const reviewer_assignments_module_1 = require("./modules/reviewer-assignments/reviewer-assignments.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const certificates_module_1 = require("./modules/certificates/certificates.module");
const decisions_module_1 = require("./modules/decisions/decisions.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const receipts_module_1 = require("./modules/receipts/receipts.module");
const payments_module_1 = require("./modules/payments/payments.module");
const monitoring_module_1 = require("./modules/monitoring/monitoring.module");
const dashboards_module_1 = require("./modules/dashboards/dashboards.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const registry_module_1 = require("./modules/registry/registry.module");
const audit_logs_module_1 = require("./modules/audit-logs/audit-logs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                cache: true,
            }),
            database_module_1.DatabaseModule,
            email_module_1.EmailModule,
            bootstrap_module_1.BootstrapModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            tenants_module_1.TenantsModule,
            institutions_module_1.InstitutionsModule,
            workflows_module_1.WorkflowsModule,
            applications_module_1.ApplicationsModule,
            application_documents_module_1.ApplicationDocumentsModule,
            queries_module_1.QueriesModule,
            reviewer_assignments_module_1.ReviewerAssignmentsModule,
            reviews_module_1.ReviewsModule,
            certificates_module_1.CertificatesModule,
            decisions_module_1.DecisionsModule,
            invoices_module_1.InvoicesModule,
            receipts_module_1.ReceiptsModule,
            payments_module_1.PaymentsModule,
            monitoring_module_1.MonitoringModule,
            dashboards_module_1.DashboardsModule,
            notifications_module_1.NotificationsModule,
            registry_module_1.RegistryModule,
            audit_logs_module_1.AuditLogsModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map