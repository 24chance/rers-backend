import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../common/enums/user-role.enum';

/**
 * Minimal shape of a User record returned by Prisma.
 * Replaced by the generated `User` type once `prisma generate` is run.
 */
interface PrismaUser {
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
  tenantId: string | null;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

const SALT_ROUNDS = 10;
const OTP_TTL_MINUTES = 10;
const RESET_TTL_HOURS = 1;

interface JwtTokenPayload {
  sub: string;
  email: string;
  role: string;
  tenantId: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // ─── Internal helpers ────────────────────────────────────────────────────────

  private generateOtp(): string {
    return Math.floor(100_000 + Math.random() * 900_000).toString();
  }

  private otpExpiresAt(): Date {
    const d = new Date();
    d.setMinutes(d.getMinutes() + OTP_TTL_MINUTES);
    return d;
  }

  private resetExpiresAt(): Date {
    const d = new Date();
    d.setHours(d.getHours() + RESET_TTL_HOURS);
    return d;
  }

  private signToken(payload: JwtTokenPayload): string {
    return this.jwtService.sign(payload);
  }

  // ─── Public API ──────────────────────────────────────────────────────────────

  /**
   * Used by LocalStrategy to verify credentials without issuing a token.
   * Returns the User record on success, null on failure.
   */
  async validateUser(email: string, password: string): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return null;

    return user;
  }

  // ─── register ────────────────────────────────────────────────────────────────

  async register(dto: RegisterDto): Promise<{ message: string; otp: string }> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }

    const targetRoleName: UserRole = dto.role ?? UserRole.APPLICANT;

    const role = await this.prisma.role.findUnique({
      where: { name: targetRoleName },
    });

    if (!role) {
      throw new BadRequestException(
        `Role "${targetRoleName}" has not been seeded in the database.`,
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const otp = this.generateOtp();

    await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone ?? null,
        roleId: role.id,
        isActive: true,
        isVerified: false,
        otpCode: otp,
        otpExpiresAt: this.otpExpiresAt(),
      },
    });

    // In production, send `otp` via email/SMS. Returning it here for
    // development / testing purposes only.
    return {
      message: 'Registration successful. Please verify your account with the OTP.',
      otp,
    };
  }

  // ─── login ───────────────────────────────────────────────────────────────────

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Your account has been deactivated.');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Please verify your account with the OTP before logging in.',
      );
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const payload: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
      tenantId: user.tenantId ?? null,
    };

    return { accessToken: this.signToken(payload) };
  }

  // ─── verifyOtp ───────────────────────────────────────────────────────────────

  async verifyOtp(dto: VerifyOtpDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('No account found with this email address.');
    }

    if (!user.otpCode || user.otpCode !== dto.otp) {
      throw new BadRequestException('Invalid OTP code.');
    }

    if (!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return { message: 'Account verified successfully. You can now log in.' };
  }

  // ─── forgotPassword ──────────────────────────────────────────────────────────

  async forgotPassword(
    dto: ForgotPasswordDto,
  ): Promise<{ message: string; resetToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Avoid leaking whether an account exists
    if (!user) {
      return {
        message:
          'If an account with that email exists, a reset link has been sent.',
        resetToken: '',
      };
    }

    const resetToken = uuidv4();

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetExpiresAt: this.resetExpiresAt(),
      },
    });

    // In production, email the resetToken to the user.
    return {
      message:
        'If an account with that email exists, a reset link has been sent.',
      resetToken,
    };
  }

  // ─── resetPassword ───────────────────────────────────────────────────────────

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: { resetToken: dto.token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired password reset token.');
    }

    if (!user.resetExpiresAt || user.resetExpiresAt < new Date()) {
      throw new BadRequestException(
        'Password reset token has expired. Please request a new one.',
      );
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetExpiresAt: null,
      },
    });

    return { message: 'Password reset successfully. You can now log in.' };
  }

  // ─── getMe ───────────────────────────────────────────────────────────────────

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        isActive: true,
        isVerified: true,
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
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
