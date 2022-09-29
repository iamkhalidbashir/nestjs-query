import { Class, Filter, QueryService } from '@nestjs-query/core';
import { NestjsQueryDataloader } from './relations.loader';
export declare type FindRelationsArgs<DTO, Relation> = {
    dto: DTO;
    filter?: Filter<Relation>;
};
export declare class FindRelationsLoader<DTO, Relation> implements NestjsQueryDataloader<DTO, FindRelationsArgs<DTO, Relation>, Relation | undefined | Error> {
    readonly RelationDTO: Class<Relation>;
    readonly relationName: string;
    constructor(RelationDTO: Class<Relation>, relationName: string);
    createLoader(service: QueryService<DTO, unknown, unknown>): (args: ReadonlyArray<FindRelationsArgs<DTO, Relation>>) => Promise<(Relation | undefined | Error)[]>;
    private loadResults;
    private groupFinds;
}
