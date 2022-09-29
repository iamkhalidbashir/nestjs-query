export declare const dbType: string;
export declare const truncateSql: (table: string) => string[];
interface QueryExecutor {
    query(sql: string): Promise<unknown>;
}
export declare const asyncLoop: <T>(items: T[], fn: (t: T) => Promise<unknown>) => Promise<void>;
export declare const executeTruncate: (exec: QueryExecutor, table: string | string[]) => Promise<void>;
export {};
