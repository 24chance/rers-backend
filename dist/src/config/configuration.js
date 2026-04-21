"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '4000', 10),
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    database: {
        url: process.env.DATABASE_URL ?? '',
    },
    jwt: {
        secret: process.env.JWT_SECRET ?? 'change-me-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN ?? '15m',
        refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change-refresh-secret-in-production',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    },
    redis: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB ?? '0', 10),
    },
    smtp: {
        host: process.env.SMTP_HOST ?? 'localhost',
        port: parseInt(process.env.SMTP_PORT ?? '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from: process.env.SMTP_FROM ?? 'noreply@rnec.go.ke',
    },
    upload: {
        destination: process.env.UPLOAD_DESTINATION ?? './uploads',
        maxFileSizeMb: parseInt(process.env.UPLOAD_MAX_FILE_SIZE_MB ?? '10', 10),
        allowedMimeTypes: (process.env.UPLOAD_ALLOWED_MIME_TYPES ??
            'application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document').split(','),
    },
});
//# sourceMappingURL=configuration.js.map