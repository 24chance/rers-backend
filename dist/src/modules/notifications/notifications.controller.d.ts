import type { JwtPayload } from '../../common/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: JwtPayload, page?: string, pageSize?: string): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            pageSize: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(user: JwtPayload): Promise<{
        count: number;
    }>;
    markRead(id: string, user: JwtPayload): Promise<any>;
    markAllRead(user: JwtPayload): Promise<{
        count: number;
    }>;
}
