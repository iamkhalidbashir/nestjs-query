import { Projectable } from 'sequelize';
import { AggregateQuery, AggregateResponse } from '@nestjs-query/core';
import { Model, ModelCtor } from 'sequelize-typescript';
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
export declare class AggregateBuilder<Entity extends Model<Entity, Partial<Entity>>> {
    readonly model: ModelCtor<Entity>;
    static convertToAggregateResponse<Entity>(rawAggregates: Record<string, unknown>[]): AggregateResponse<Entity>[];
    constructor(model: ModelCtor<Entity>);
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param aggregate - the aggregates to select.
     */
    build(aggregate: AggregateQuery<Entity>): Projectable;
    private createAggSelect;
    private createGroupBySelect;
}
