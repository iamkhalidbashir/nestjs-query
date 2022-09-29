import { AggregateQuery, AggregateResponse } from '@nestjs-query/core';
import { Document } from 'mongoose';
declare type Aggregate = Record<string, Record<string, unknown>>;
declare type Group = {
    _id: Record<string, string> | null;
};
export declare type MongooseGroupAndAggregate = Aggregate & Group;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class AggregateBuilder<Entity extends Document> {
    static convertToAggregateResponse<Entity>(aggregates: Record<string, unknown>[]): AggregateResponse<Entity>[];
    private static extractResponse;
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate: AggregateQuery<Entity>): MongooseGroupAndAggregate;
    private createAggSelect;
    private createGroupBySelect;
    getGroupBySelects(fields?: (keyof Entity)[]): string[] | undefined;
    private getGroupByAlias;
}
export {};
