import { Class } from '@nestjs-query/core';
import { OffsetQueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
import { PagingStrategies } from '../paging';
export declare type OffsetQueryArgsType<DTO> = QueryType<DTO, PagingStrategies.OFFSET>;
export declare function createOffsetQueryArgs<DTO>(DTOClass: Class<DTO>, opts?: OffsetQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.OFFSET>;
