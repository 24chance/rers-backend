"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuditLog = createAuditLog;
async function createAuditLog(database, params) {
    try {
        await database.auditLog.create({
            data: {
                actorId: params.actorId ?? null,
                action: params.action,
                targetEntity: params.targetEntity,
                targetId: params.targetId,
                tenantId: params.tenantId ?? null,
                metadata: params.metadata ?? {},
                ipAddress: params.ipAddress ?? null,
            },
        });
    }
    catch (error) {
        console.error('[AuditLog] Failed to persist audit log entry', {
            action: params.action,
            targetEntity: params.targetEntity,
            targetId: params.targetId,
            error,
        });
    }
}
//# sourceMappingURL=audit.util.js.map