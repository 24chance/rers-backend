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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const database_service_1 = require("../../common/database/database.service");
const email_service_1 = require("../../common/email/email.service");
const SALT_ROUNDS = 10;
const OTP_TTL_MINUTES = 10;
const RESET_TTL_HOURS = 1;
let AuthService = class AuthService {
    database;
    jwtService;
    emailService;
    constructor(database, jwtService, emailService) {
        this.database = database;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    generateOtp() {
        return Math.floor(100_000 + Math.random() * 900_000).toString();
    }
    otpExpiresAt() {
        const d = new Date();
        d.setMinutes(d.getMinutes() + OTP_TTL_MINUTES);
        return d;
    }
    resetExpiresAt() {
        const d = new Date();
        d.setHours(d.getHours() + RESET_TTL_HOURS);
        return d;
    }
    signToken(payload) {
        return this.jwtService.sign(payload);
    }
    async validateUser(email, password) {
        const user = await this.database.user.findUnique({ where: { email } });
        if (!user)
            return null;
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
            return null;
        return user;
    }
    async register(dto) {
        const existing = await this.database.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('An account with this email already exists.');
        }
        const targetRoleName = user_role_enum_1.UserRole.APPLICANT;
        const role = await this.database.role.findUnique({
            where: { name: targetRoleName },
        });
        if (!role) {
            throw new common_1.BadRequestException(`Role "${targetRoleName}" has not been seeded in the database.`);
        }
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        const otp = this.generateOtp();
        await this.database.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone ?? null,
                roleId: role.id,
                isActive: true,
                isVerified: false,
                firstLogin: false,
                otpCode: otp,
                otpExpiresAt: this.otpExpiresAt(),
            },
        });
        await this.emailService.sendOtp(dto.email, otp);
        return {
            message: 'Registration successful. Please check your email for the verification code.',
        };
    }
    async login(dto) {
        const user = await this.database.user.findUnique({
            where: { email: dto.email },
            include: { role: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid email or password.');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Your account has been deactivated.');
        }
        if (!user.isVerified) {
            throw new common_1.UnauthorizedException('Please verify your account with the OTP before logging in.');
        }
        await this.database.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role.name,
            tenantId: user.tenantId ?? null,
        };
        const sanitizeUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            isActive: user.isActive,
            isVerified: user.isVerified,
            firstLogin: user.firstLogin,
            lastLoginAt: user.lastLoginAt,
            tenantId: user.tenantId,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: {
                id: user.role.id,
                name: user.role.name,
            },
        };
        return { accessToken: this.signToken(payload), user: sanitizeUser };
    }
    async verifyOtp(dto) {
        const user = await this.database.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('No account found with this email address.');
        }
        if (!user.otpCode || user.otpCode !== dto.otp) {
            throw new common_1.BadRequestException('Invalid OTP code.');
        }
        if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            throw new common_1.BadRequestException('OTP has expired. Please request a new one.');
        }
        await this.database.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                otpCode: null,
                otpExpiresAt: null,
            },
        });
        return { message: 'Account verified successfully. You can now log in.' };
    }
    async forgotPassword(dto) {
        const SAFE_MESSAGE = 'If an account with that email exists, a reset link has been sent.';
        const user = await this.database.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            return { message: SAFE_MESSAGE };
        }
        const resetToken = (0, uuid_1.v4)();
        await this.database.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetExpiresAt: this.resetExpiresAt(),
            },
        });
        await this.emailService.sendPasswordReset(dto.email, resetToken);
        return { message: SAFE_MESSAGE };
    }
    async resetPassword(dto) {
        const user = await this.database.user.findFirst({
            where: { resetToken: dto.token },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired password reset token.');
        }
        if (!user.resetExpiresAt || user.resetExpiresAt < new Date()) {
            throw new common_1.BadRequestException('Password reset token has expired. Please request a new one.');
        }
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        await this.database.user.update({
            where: { id: user.id },
            data: {
                passwordHash,
                resetToken: null,
                resetExpiresAt: null,
            },
        });
        return { message: 'Password reset successfully. You can now log in.' };
    }
    async getMe(userId) {
        const user = await this.database.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                isActive: true,
                isVerified: true,
                firstLogin: true,
                lastLoginAt: true,
                tenantId: true,
                createdAt: true,
                updatedAt: true,
                role: {
                    select: { id: true, name: true },
                },
                tenant: {
                    select: { id: true, name: true, code: true, type: true },
                },
                applicantProfile: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        return user;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.database.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found.');
        }
        const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isMatch) {
            throw new common_1.BadRequestException('Current password is incorrect.');
        }
        const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        await this.database.user.update({
            where: { id: userId },
            data: { passwordHash, firstLogin: false },
        });
        return { message: 'Password changed successfully.' };
    }
    async skipFirstLogin(userId) {
        await this.database.user.update({
            where: { id: userId },
            data: { firstLogin: false },
        });
        return { message: 'First login acknowledged.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map