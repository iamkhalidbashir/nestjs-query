import { ExecutionContext } from '@nestjs/common';
import Dataloader from 'dataloader';
export interface NestjsQueryExecutionContext extends ExecutionContext {
    nestjsQueryLoaders?: Record<string, Dataloader<unknown, unknown>>;
}
export declare class DataLoaderFactory {
    private static initializeContext;
    static getOrCreateLoader<K, V>(context: NestjsQueryExecutionContext, name: string, handler: Dataloader.BatchLoadFn<K, V>): Dataloader<K, V>;
}
