import { NotificationType } from '../../common/enums';
import { DatabaseService } from '../../common/database/database.service';
export declare class NotificationsService {
    private readonly database;
    constructor(database: DatabaseService);
    create(userId: string, type: NotificationType, title: string, message: string, metadata?: Record<string, unknown>): Promise<any>;
    findAll(userId: string, page?: number, pageSize?: number): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    markRead(id: string, userId: string): Promise<any>;
    markAllRead(userId: string): Promise<{
        count: number;
    }>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
    static send(database: DatabaseService, userId: string, type: NotificationType, title: string, message: string, metadata?: Record<string, unknown>): Promise<any>;
}
