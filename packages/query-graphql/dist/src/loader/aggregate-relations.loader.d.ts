import { AggregateQuery, Class, QueryService, Filter, AggregateResponse } from '@nestjs-query/core';
import { NestjsQueryDataloader } from './relations.loader';
declare type AggregateRelationsArgs<DTO, Relation> = {
    dto: DTO;
    filter: Filter<Relation>;
    aggregate: AggregateQuery<Relation>;
};
export declare class AggregateRelationsLoader<DTO, Relation> implements NestjsQueryDataloader<DTO, AggregateRelationsArgs<DTO, Relation>, AggregateResponse<Relation> | Error> {
    readonly RelationDTO: Class<Relation>;
    readonly relationName: string;
    constructor(RelationDTO: Class<Relation>, relationName: string);
    createLoader(service: QueryService<DTO, unknown, unknown>): (queryArgs: ReadonlyArray<AggregateRelationsArgs<DTO, Relation>>) => Promise<(AggregateResponse<Relation> | Error)[]>;
    private loadResults;
    private groupQueries;
}
export {};
