import { JwtService } from '@nestjs/jwt';
interface AuthUserRecord {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    isActive: boolean;
    isVerified: boolean;
    firstLogin: boolean;
    otpCode: string | null;
    otpExpiresAt: Date | null;
    resetToken: string | null;
    resetExpiresAt: Date | null;
    lastLoginAt: Date | null;
    tenantId: string | null;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}
import { DatabaseService } from '../../common/database/database.service';
import { EmailService } from '../../common/email/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export interface SanitizedUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    isActive: boolean;
    isVerified: boolean;
    firstLogin: boolean;
    lastLoginAt: Date | null;
    tenantId: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: {
        id: string;
        name: string;
    };
}
export declare class AuthService {
    private readonly database;
    private readonly jwtService;
    private readonly emailService;
    constructor(database: DatabaseService, jwtService: JwtService, emailService: EmailService);
    private generateOtp;
    private otpExpiresAt;
    private resetExpiresAt;
    private signToken;
    validateUser(email: string, password: string): Promise<AuthUserRecord | null>;
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: SanitizedUser;
    }>;
    verifyOtp(dto: VerifyOtpDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getMe(userId: string): Promise<any>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    skipFirstLogin(userId: string): Promise<{
        message: string;
    }>;
}
export {};
