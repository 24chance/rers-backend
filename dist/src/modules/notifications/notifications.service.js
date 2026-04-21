"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../common/database/database.service");
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
let NotificationsService = class NotificationsService {
    database;
    constructor(database) {
        this.database = database;
    }
    async create(userId, type, title, message, metadata) {
        return this.database.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                metadata: metadata ?? undefined,
            },
        });
    }
    async findAll(userId, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
        const skip = (page - 1) * pageSize;
        const [notifications, total] = await this.database.$transaction([
            this.database.notification.findMany({
                where: { userId },
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.database.notification.count({ where: { userId } }),
        ]);
        return {
            data: notifications,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }
    async markRead(id, userId) {
        const notification = await this.database.notification.findUnique({
            where: { id },
            select: { id: true, userId: true },
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification "${id}" not found.`);
        }
        if (notification.userId !== userId) {
            throw new common_1.NotFoundException(`Notification "${id}" not found.`);
        }
        return this.database.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async markAllRead(userId) {
        return this.database.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }
    async getUnreadCount(userId) {
        const count = await this.database.notification.count({
            where: { userId, isRead: false },
        });
        return { count };
    }
    static async send(database, userId, type, title, message, metadata) {
        return database.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                metadata: metadata ?? undefined,
            },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map