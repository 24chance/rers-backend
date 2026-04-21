"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UserProvisioningService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvisioningService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const database_service_1 = require("../database/database.service");
const email_service_1 = require("../email/email.service");
const SALT_ROUNDS = 10;
let UserProvisioningService = UserProvisioningService_1 = class UserProvisioningService {
    database;
    emailService;
    logger = new common_1.Logger(UserProvisioningService_1.name);
    constructor(database, emailService) {
        this.database = database;
        this.emailService = emailService;
    }
    generatePassword() {
        const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lower = 'abcdefghijkmnpqrstuvwxyz';
        const digits = '23456789';
        const special = '!@#$%';
        const all = upper + lower + digits + special;
        const required = [
            upper[Math.floor(Math.random() * upper.length)],
            lower[Math.floor(Math.random() * lower.length)],
            digits[Math.floor(Math.random() * digits.length)],
            special[Math.floor(Math.random() * special.length)],
        ];
        const rest = Array.from({ length: 8 }, () => all[Math.floor(Math.random() * all.length)]);
        return [...required, ...rest]
            .sort(() => Math.random() - 0.5)
            .join('');
    }
    async provision(input) {
        const plainPassword = this.generatePassword();
        const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
        const user = await this.database.user.create({
            data: {
                email: input.email,
                passwordHash,
                firstName: input.firstName,
                lastName: input.lastName,
                phone: input.phone ?? null,
                roleId: input.roleId,
                tenantId: input.tenantId ?? null,
                isActive: true,
                isVerified: true,
                firstLogin: true,
            },
        });
        this.emailService
            .sendWelcomeCredentials(input.email, input.firstName, input.email, plainPassword)
            .catch((err) => this.logger.error(`Failed to send welcome email to ${input.email}`, err));
        return user;
    }
};
exports.UserProvisioningService = UserProvisioningService;
exports.UserProvisioningService = UserProvisioningService = UserProvisioningService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        email_service_1.EmailService])
], UserProvisioningService);
//# sourceMappingURL=user-provisioning.service.js.map