import { Class, Filter, QueryService } from '@nestjs-query/core';
import { NestjsQueryDataloader } from './relations.loader';
declare type CountRelationsArgs<DTO, Relation> = {
    dto: DTO;
    filter: Filter<Relation>;
};
export declare class CountRelationsLoader<DTO, Relation> implements NestjsQueryDataloader<DTO, CountRelationsArgs<DTO, Relation>, number | Error> {
    readonly RelationDTO: Class<Relation>;
    readonly relationName: string;
    constructor(RelationDTO: Class<Relation>, relationName: string);
    createLoader(service: QueryService<DTO, unknown, unknown>): (queryArgs: ReadonlyArray<CountRelationsArgs<DTO, Relation>>) => Promise<(number | Error)[]>;
    private loadResults;
    private groupQueries;
}
export {};
