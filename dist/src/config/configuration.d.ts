export interface DatabaseConfig {
    url: string;
}
export interface JwtConfig {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}
export interface RedisConfig {
    host: string;
    port: number;
    password: string | undefined;
    db: number;
}
export interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string | undefined;
    pass: string | undefined;
    from: string;
}
export interface UploadConfig {
    destination: string;
    maxFileSizeMb: number;
    allowedMimeTypes: string[];
}
export interface AppConfig {
    nodeEnv: string;
    port: number;
    frontendUrl: string;
    database: DatabaseConfig;
    jwt: JwtConfig;
    redis: RedisConfig;
    smtp: SmtpConfig;
    upload: UploadConfig;
}
declare const _default: () => AppConfig;
export default _default;
