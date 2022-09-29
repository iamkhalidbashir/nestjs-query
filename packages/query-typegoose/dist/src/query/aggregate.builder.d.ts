import { AggregateQuery, AggregateResponse } from '@nestjs-query/core';
import { DocumentType } from '@typegoose/typegoose';
declare type Aggregate = Record<string, Record<string, unknown>>;
declare type Group = {
    _id: Record<string, string> | null;
};
export declare type TypegooseGroupAndAggregate = Aggregate & Group;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class AggregateBuilder<Entity> {
    static convertToAggregateResponse<Entity>(aggregates: Record<string, unknown>[]): AggregateResponse<Entity>[];
    private static extractResponse;
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate: AggregateQuery<DocumentType<Entity>>): TypegooseGroupAndAggregate;
    private createAggSelect;
    private createGroupBySelect;
    getGroupBySelects(fields?: (keyof DocumentType<Entity>)[]): string[] | undefined;
    private getGroupByAlias;
}
export {};
