import { OnModuleDestroy } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
type DatabaseRecord = Record<string, any>;
interface DatabaseQueryOptions {
    include?: DatabaseRecord;
    orderBy?: DatabaseRecord;
    select?: DatabaseRecord;
    skip?: number;
    take?: number;
    where?: DatabaseRecord;
}
interface DatabaseCreateOptions extends DatabaseQueryOptions {
    data: DatabaseRecord;
}
interface DatabaseUpdateOptions extends DatabaseCreateOptions {
    where: DatabaseRecord;
}
interface DatabaseDeleteOptions {
    where: DatabaseRecord;
}
interface DatabaseGroupByOptions {
    by: string[];
    where?: DatabaseRecord;
    _count?: DatabaseRecord;
}
declare class ModelAdapter {
    private readonly dataSource;
    private readonly entity;
    constructor(dataSource: DataSource, entity: EntityTarget<any>);
    private get repository();
    findUnique(options: DatabaseQueryOptions): Promise<any | null>;
    findFirst(options: DatabaseQueryOptions): Promise<any | null>;
    findMany(options?: DatabaseQueryOptions): Promise<any[]>;
    count(options?: DatabaseQueryOptions): Promise<number>;
    create(options: DatabaseCreateOptions): Promise<any>;
    update(options: DatabaseUpdateOptions): Promise<any>;
    delete(options: DatabaseDeleteOptions): Promise<any | null>;
    deleteMany(options: DatabaseDeleteOptions): Promise<{
        count: number;
    }>;
    updateMany(options: DatabaseUpdateOptions): Promise<{
        count: number;
    }>;
    groupBy(options: DatabaseGroupByOptions): Promise<any[]>;
    private reload;
    private getPrimaryWhere;
    private buildWhere;
    private buildWhereRelations;
    private collectWhereRelationPaths;
    private buildRelations;
    private collectSelectionRelationPaths;
    private buildOrder;
    private isOperatorObject;
    private toOperator;
    private cleanData;
    private transform;
    private transformWithSelect;
    private transformWithInclude;
    private transformRelationValue;
    private sortArray;
    private buildRelationCounts;
    private scalarSnapshot;
}
export declare class DatabaseService implements OnModuleDestroy {
    private readonly dataSource;
    readonly adverseEvent: ModelAdapter;
    readonly amendment: ModelAdapter;
    readonly applicantProfile: ModelAdapter;
    readonly application: ModelAdapter;
    readonly applicationDocument: ModelAdapter;
    readonly auditLog: ModelAdapter;
    readonly certificate: ModelAdapter;
    readonly closureReport: ModelAdapter;
    readonly decision: ModelAdapter;
    readonly institution: ModelAdapter;
    readonly invoice: ModelAdapter;
    readonly notification: ModelAdapter;
    readonly payment: ModelAdapter;
    readonly permission: ModelAdapter;
    readonly progressReport: ModelAdapter;
    readonly protocolDeviation: ModelAdapter;
    readonly query: ModelAdapter;
    readonly queryResponse: ModelAdapter;
    readonly receipt: ModelAdapter;
    readonly renewal: ModelAdapter;
    readonly review: ModelAdapter;
    readonly reviewAssignment: ModelAdapter;
    readonly role: ModelAdapter;
    readonly rolePermission: ModelAdapter;
    readonly tenant: ModelAdapter;
    readonly user: ModelAdapter;
    readonly workflowTransition: ModelAdapter;
    constructor(dataSource: DataSource);
    $transaction<T extends readonly unknown[]>(operations: {
        [K in keyof T]: Promise<T[K]>;
    }): Promise<T>;
    onModuleDestroy(): Promise<void>;
    private createModel;
}
export {};
