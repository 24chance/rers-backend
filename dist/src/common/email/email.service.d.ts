export declare class EmailService {
    private readonly logger;
    private readonly transporter;
    private readonly from;
    constructor();
    sendPasswordReset(to: string, resetToken: string): Promise<void>;
    sendWelcomeCredentials(to: string, firstName: string, email: string, password: string): Promise<void>;
    sendOtp(to: string, otp: string): Promise<void>;
}
