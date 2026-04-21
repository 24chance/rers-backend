"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.createDatabaseOptions = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const models_1 = require("../database/models");
(0, dotenv_1.config)();
const isProduction = process.env.NODE_ENV === 'production';
const getDatabaseUrl = () => {
    return process.env.DATABASE_URL ?? process.env.DB_URL ?? '';
};
const requiresSSL = (url) => {
    return url.includes('sslmode=require') || url.includes('neon.tech');
};
const createDatabaseOptions = () => {
    const databaseUrl = getDatabaseUrl();
    return {
        type: 'postgres',
        url: databaseUrl,
        synchronize: true,
        logging: false,
        entities: models_1.databaseEntities,
        extra: {
            connectionTimeoutMillis: 30000,
        },
        ssl: isProduction
            ? false
            : requiresSSL(databaseUrl)
                ? { rejectUnauthorized: false }
                : false,
        schema: 'public',
    };
};
exports.createDatabaseOptions = createDatabaseOptions;
exports.AppDataSource = new typeorm_1.DataSource((0, exports.createDatabaseOptions)());
//# sourceMappingURL=db.js.map