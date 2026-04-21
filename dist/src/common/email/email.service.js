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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    from;
    constructor() {
        this.from = `RNEC <${process.env.GMAIL_USER}>`;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
    }
    async sendPasswordReset(to, resetToken) {
        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
        const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Reset your RNEC password',
                html: `
          <p>Hello,</p>
          <p>Click the link below to reset your password. It expires in <strong>1 hour</strong>.</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>If you did not request a password reset, you can ignore this email.</p>
        `,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send password reset email to ${to}`, err);
            throw err;
        }
    }
    async sendWelcomeCredentials(to, firstName, email, password) {
        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Your RNEC account has been created',
                html: `
          <p>Hello ${firstName},</p>
          <p>Your account on the <strong>RNEC Research Ethics Review System</strong> has been created.</p>
          <p>Here are your login credentials:</p>
          <table style="border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:4px 12px 4px 0;color:#555">Email</td><td><strong>${email}</strong></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#555">Password</td><td><strong style="font-family:monospace;font-size:15px">${password}</strong></td></tr>
          </table>
          <p>Please <a href="${frontendUrl}/login">log in</a> and change your password immediately.</p>
          <p style="color:#999;font-size:12px">If you were not expecting this email, please contact your administrator.</p>
        `,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send welcome credentials email to ${to}`, err);
        }
    }
    async sendOtp(to, otp) {
        try {
            await this.transporter.sendMail({
                from: this.from,
                to,
                subject: 'Your RNEC verification code',
                html: `
          <p>Hello,</p>
          <p>Use the code below to verify your account. It expires in <strong>10 minutes</strong>.</p>
          <h2 style="letter-spacing:4px">${otp}</h2>
          <p>If you did not create an account, you can ignore this email.</p>
        `,
            });
        }
        catch (err) {
            this.logger.error(`Failed to send OTP email to ${to}`, err);
            throw err;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map