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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const models_1 = require("../../database/models");
const OPERATOR_KEYS = new Set([
    'contains',
    'startsWith',
    'in',
    'gte',
    'lte',
    'not',
    'mode',
]);
function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function uniquePathsToRelations(paths) {
    if (paths.size === 0) {
        return undefined;
    }
    const relations = {};
    for (const path of paths) {
        const segments = path.split('.');
        let cursor = relations;
        for (let index = 0; index < segments.length; index += 1) {
            const segment = segments[index];
            const isLeaf = index === segments.length - 1;
            if (isLeaf) {
                cursor[segment] = true;
                continue;
            }
            cursor[segment] = cursor[segment] && cursor[segment] !== true ? cursor[segment] : {};
            cursor = cursor[segment];
        }
    }
    return relations;
}
class ModelAdapter {
    dataSource;
    entity;
    constructor(dataSource, entity) {
        this.dataSource = dataSource;
        this.entity = entity;
    }
    get repository() {
        return this.dataSource.getRepository(this.entity);
    }
    async findUnique(options) {
        const records = await this.repository.find({
            where: this.buildWhere(options.where),
            relations: this.buildRelations(options),
            take: 1,
        });
        if (records.length === 0) {
            return null;
        }
        return this.transform(records[0], options);
    }
    async findFirst(options) {
        const records = await this.repository.find({
            where: this.buildWhere(options.where),
            relations: this.buildRelations(options),
            order: this.buildOrder(options.orderBy),
            take: 1,
        });
        if (records.length === 0) {
            return null;
        }
        return this.transform(records[0], options);
    }
    async findMany(options = {}) {
        const records = await this.repository.find({
            where: this.buildWhere(options.where),
            relations: this.buildRelations(options),
            order: this.buildOrder(options.orderBy),
            skip: options.skip,
            take: options.take,
        });
        return records.map((record) => this.transform(record, options));
    }
    async count(options = {}) {
        return this.repository.count({
            where: this.buildWhere(options.where),
        });
    }
    async create(options) {
        const payload = this.cleanData(options.data);
        const entity = this.repository.create(payload);
        const saved = await this.repository.save(entity);
        if (!options.include && !options.select) {
            return this.transform(saved, {});
        }
        return this.reload(saved, options);
    }
    async update(options) {
        const current = await this.repository.findOne({
            where: this.buildWhere(options.where),
        });
        if (!current) {
            return null;
        }
        const updated = this.repository.merge(current, this.cleanData(options.data));
        const saved = await this.repository.save(updated);
        if (!options.include && !options.select) {
            return this.transform(saved, {});
        }
        return this.reload(saved, options);
    }
    async delete(options) {
        const current = await this.repository.findOne({
            where: this.buildWhere(options.where),
        });
        if (!current) {
            return null;
        }
        await this.repository.remove(current);
        return this.transform(current, {});
    }
    async updateMany(options) {
        const records = await this.repository.find({
            where: this.buildWhere(options.where),
        });
        if (records.length === 0) {
            return { count: 0 };
        }
        const nextRecords = records.map((record) => this.repository.merge(record, this.cleanData(options.data)));
        await this.repository.save(nextRecords);
        return { count: records.length };
    }
    async groupBy(options) {
        const records = await this.repository.find({
            where: this.buildWhere(options.where),
            relations: this.buildWhereRelations(options.where),
        });
        const groups = new Map();
        for (const record of records) {
            const keyValues = options.by.map((field) => record[field]);
            const groupKey = JSON.stringify(keyValues);
            if (!groups.has(groupKey)) {
                const baseGroup = {};
                for (let index = 0; index < options.by.length; index += 1) {
                    baseGroup[options.by[index]] = keyValues[index];
                }
                baseGroup._count = {};
                groups.set(groupKey, baseGroup);
            }
            const group = groups.get(groupKey);
            const countKeys = Object.keys(options._count ?? {});
            if (countKeys.length === 0) {
                group._count._all = (group._count._all ?? 0) + 1;
                continue;
            }
            for (const countKey of countKeys) {
                group._count[countKey] = (group._count[countKey] ?? 0) + 1;
            }
        }
        return Array.from(groups.values());
    }
    async reload(record, options) {
        return this.findUnique({
            where: this.getPrimaryWhere(record),
            include: options.include,
            select: options.select,
        });
    }
    getPrimaryWhere(record) {
        const where = {};
        for (const primaryColumn of this.repository.metadata.primaryColumns) {
            where[primaryColumn.propertyName] = record[primaryColumn.propertyName];
        }
        return where;
    }
    buildWhere(where, metadata) {
        if (!where) {
            return undefined;
        }
        const entityMetadata = metadata ?? this.repository.metadata;
        const builtWhere = {};
        for (const [key, rawValue] of Object.entries(where)) {
            if (rawValue === undefined) {
                continue;
            }
            if (key === 'OR' && Array.isArray(rawValue)) {
                return rawValue.map((entry) => this.buildWhere(entry, entityMetadata));
            }
            if (isPlainObject(rawValue) && !this.isOperatorObject(rawValue)) {
                const relation = entityMetadata.findRelationWithPropertyPath(key);
                if (relation) {
                    builtWhere[key] = this.buildWhere(rawValue, relation.inverseEntityMetadata);
                    continue;
                }
                Object.assign(builtWhere, this.buildWhere(rawValue, entityMetadata));
                continue;
            }
            builtWhere[key] = this.toOperator(rawValue);
        }
        return builtWhere;
    }
    buildWhereRelations(where) {
        const relationPaths = new Set();
        this.collectWhereRelationPaths(where, this.repository.metadata, '', relationPaths);
        return uniquePathsToRelations(relationPaths);
    }
    collectWhereRelationPaths(where, metadata, prefix, relationPaths) {
        if (!where) {
            return;
        }
        for (const [key, value] of Object.entries(where)) {
            if (!isPlainObject(value) || this.isOperatorObject(value)) {
                continue;
            }
            const relation = metadata.findRelationWithPropertyPath(key);
            if (!relation) {
                continue;
            }
            const path = prefix ? `${prefix}.${key}` : key;
            relationPaths.add(path);
            this.collectWhereRelationPaths(value, relation.inverseEntityMetadata, path, relationPaths);
        }
    }
    buildRelations(options) {
        const relationPaths = new Set();
        this.collectSelectionRelationPaths(options.include, this.repository.metadata, '', relationPaths);
        this.collectSelectionRelationPaths(options.select, this.repository.metadata, '', relationPaths);
        this.collectWhereRelationPaths(options.where, this.repository.metadata, '', relationPaths);
        return uniquePathsToRelations(relationPaths);
    }
    collectSelectionRelationPaths(selection, metadata, prefix, relationPaths) {
        if (!selection) {
            return;
        }
        for (const [key, value] of Object.entries(selection)) {
            if (key === '_count' && isPlainObject(value) && isPlainObject(value.select)) {
                for (const [relationName, enabled] of Object.entries(value.select)) {
                    if (!enabled) {
                        continue;
                    }
                    const relation = metadata.findRelationWithPropertyPath(relationName);
                    if (!relation) {
                        continue;
                    }
                    const path = prefix ? `${prefix}.${relationName}` : relationName;
                    relationPaths.add(path);
                }
                continue;
            }
            const relation = metadata.findRelationWithPropertyPath(key);
            if (!relation) {
                continue;
            }
            const path = prefix ? `${prefix}.${key}` : key;
            relationPaths.add(path);
            if (!isPlainObject(value)) {
                continue;
            }
            const nestedSelection = isPlainObject(value.select)
                ? value.select
                : isPlainObject(value.include)
                    ? value.include
                    : value;
            this.collectSelectionRelationPaths(nestedSelection, relation.inverseEntityMetadata, path, relationPaths);
        }
    }
    buildOrder(orderBy) {
        if (!orderBy) {
            return undefined;
        }
        const builtOrder = {};
        for (const [key, value] of Object.entries(orderBy)) {
            builtOrder[key] = String(value).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
        }
        return builtOrder;
    }
    isOperatorObject(value) {
        return Object.keys(value).some((key) => OPERATOR_KEYS.has(key));
    }
    toOperator(value) {
        if (!isPlainObject(value)) {
            return value;
        }
        if (value.contains !== undefined) {
            return value.mode === 'insensitive'
                ? (0, typeorm_1.ILike)(`%${value.contains}%`)
                : (0, typeorm_1.Like)(`%${value.contains}%`);
        }
        if (value.startsWith !== undefined) {
            return value.mode === 'insensitive'
                ? (0, typeorm_1.ILike)(`${value.startsWith}%`)
                : (0, typeorm_1.Like)(`${value.startsWith}%`);
        }
        if (Array.isArray(value.in)) {
            return (0, typeorm_1.In)(value.in);
        }
        if (value.gte !== undefined && value.lte !== undefined) {
            return (0, typeorm_1.Between)(value.gte, value.lte);
        }
        if (value.gte !== undefined) {
            return (0, typeorm_1.MoreThanOrEqual)(value.gte);
        }
        if (value.lte !== undefined) {
            return (0, typeorm_1.LessThanOrEqual)(value.lte);
        }
        if (value.not !== undefined) {
            return (0, typeorm_1.Not)(this.toOperator(value.not));
        }
        return value;
    }
    cleanData(value) {
        if (Array.isArray(value)) {
            return value.map((entry) => this.cleanData(entry));
        }
        if (!isPlainObject(value)) {
            return value;
        }
        const cleaned = {};
        for (const [key, entry] of Object.entries(value)) {
            if (entry === undefined) {
                continue;
            }
            cleaned[key] = this.cleanData(entry);
        }
        return cleaned;
    }
    transform(record, options) {
        if (options.select) {
            return this.transformWithSelect(record, this.repository.metadata, options.select);
        }
        if (options.include) {
            return this.transformWithInclude(record, this.repository.metadata, options.include);
        }
        return this.scalarSnapshot(record, this.repository.metadata);
    }
    transformWithSelect(record, metadata, select) {
        const transformed = {};
        for (const [key, value] of Object.entries(select)) {
            if (!value) {
                continue;
            }
            if (key === '_count' && isPlainObject(value) && isPlainObject(value.select)) {
                transformed._count = this.buildRelationCounts(record, metadata, value.select);
                continue;
            }
            const relation = metadata.findRelationWithPropertyPath(key);
            if (!relation) {
                transformed[key] = record[key];
                continue;
            }
            transformed[key] = this.transformRelationValue(record[key], relation.inverseEntityMetadata, value === true ? undefined : value);
        }
        return transformed;
    }
    transformWithInclude(record, metadata, include) {
        const transformed = this.scalarSnapshot(record, metadata);
        for (const [key, value] of Object.entries(include)) {
            if (!value) {
                continue;
            }
            if (key === '_count' && isPlainObject(value) && isPlainObject(value.select)) {
                transformed._count = this.buildRelationCounts(record, metadata, value.select);
                continue;
            }
            const relation = metadata.findRelationWithPropertyPath(key);
            if (!relation) {
                continue;
            }
            transformed[key] = this.transformRelationValue(record[key], relation.inverseEntityMetadata, value === true ? undefined : value);
        }
        return transformed;
    }
    transformRelationValue(value, metadata, options) {
        if (Array.isArray(value)) {
            const sorted = this.sortArray(value, options?.orderBy);
            return sorted.map((entry) => {
                if (options?.select) {
                    return this.transformWithSelect(entry, metadata, options.select);
                }
                if (options?.include) {
                    return this.transformWithInclude(entry, metadata, options.include);
                }
                return this.scalarSnapshot(entry, metadata);
            });
        }
        if (value === null || value === undefined) {
            return value;
        }
        if (options?.select) {
            return this.transformWithSelect(value, metadata, options.select);
        }
        if (options?.include) {
            return this.transformWithInclude(value, metadata, options.include);
        }
        return this.scalarSnapshot(value, metadata);
    }
    sortArray(items, orderBy) {
        if (!orderBy) {
            return items;
        }
        const [[field, direction]] = Object.entries(orderBy);
        const multiplier = String(direction).toLowerCase() === 'asc' ? 1 : -1;
        return [...items].sort((left, right) => {
            const leftValue = left[field];
            const rightValue = right[field];
            if (leftValue === rightValue) {
                return 0;
            }
            return leftValue > rightValue ? multiplier : -multiplier;
        });
    }
    buildRelationCounts(record, metadata, countSelect) {
        const counts = {};
        for (const relationName of Object.keys(countSelect)) {
            const relation = metadata.findRelationWithPropertyPath(relationName);
            if (!relation) {
                continue;
            }
            const relationValue = record[relationName];
            if (Array.isArray(relationValue)) {
                counts[relationName] = relationValue.length;
                continue;
            }
            counts[relationName] = relationValue ? 1 : 0;
        }
        return counts;
    }
    scalarSnapshot(record, metadata) {
        const snapshot = {};
        for (const column of metadata.columns) {
            snapshot[column.propertyName] = record[column.propertyName];
        }
        return snapshot;
    }
}
let DatabaseService = class DatabaseService {
    dataSource;
    adverseEvent;
    amendment;
    applicantProfile;
    application;
    applicationDocument;
    auditLog;
    certificate;
    closureReport;
    decision;
    institution;
    invoice;
    notification;
    payment;
    permission;
    progressReport;
    protocolDeviation;
    query;
    queryResponse;
    receipt;
    renewal;
    review;
    reviewAssignment;
    role;
    rolePermission;
    tenant;
    user;
    workflowTransition;
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.adverseEvent = this.createModel(models_1.AdverseEvent);
        this.amendment = this.createModel(models_1.Amendment);
        this.applicantProfile = this.createModel(models_1.ApplicantProfile);
        this.application = this.createModel(models_1.Application);
        this.applicationDocument = this.createModel(models_1.ApplicationDocument);
        this.auditLog = this.createModel(models_1.AuditLog);
        this.certificate = this.createModel(models_1.Certificate);
        this.closureReport = this.createModel(models_1.ClosureReport);
        this.decision = this.createModel(models_1.Decision);
        this.institution = this.createModel(models_1.Institution);
        this.invoice = this.createModel(models_1.Invoice);
        this.notification = this.createModel(models_1.Notification);
        this.payment = this.createModel(models_1.Payment);
        this.permission = this.createModel(models_1.Permission);
        this.progressReport = this.createModel(models_1.ProgressReport);
        this.protocolDeviation = this.createModel(models_1.ProtocolDeviation);
        this.query = this.createModel(models_1.Query);
        this.queryResponse = this.createModel(models_1.QueryResponse);
        this.receipt = this.createModel(models_1.Receipt);
        this.renewal = this.createModel(models_1.Renewal);
        this.review = this.createModel(models_1.Review);
        this.reviewAssignment = this.createModel(models_1.ReviewAssignment);
        this.role = this.createModel(models_1.Role);
        this.rolePermission = this.createModel(models_1.RolePermission);
        this.tenant = this.createModel(models_1.Tenant);
        this.user = this.createModel(models_1.User);
        this.workflowTransition = this.createModel(models_1.WorkflowTransition);
    }
    async $transaction(operations) {
        return Promise.all(operations);
    }
    async onModuleDestroy() {
        if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
        }
    }
    createModel(entity) {
        return new ModelAdapter(this.dataSource, entity);
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DatabaseService);
//# sourceMappingURL=database.service.js.map