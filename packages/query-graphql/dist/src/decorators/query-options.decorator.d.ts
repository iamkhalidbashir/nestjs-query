import { Class, MetaValue } from '@nestjs-query/core';
import { QueryArgsTypeOpts } from '../types';
export declare type QueryOptionsDecoratorOpts<DTO> = QueryArgsTypeOpts<DTO>;
export declare function QueryOptions(opts: QueryOptionsDecoratorOpts<any>): (target: Class<unknown>) => void;
export declare const getQueryOptions: <DTO>(DTOClass: Class<DTO>) => MetaValue<QueryArgsTypeOpts<DTO>>;
