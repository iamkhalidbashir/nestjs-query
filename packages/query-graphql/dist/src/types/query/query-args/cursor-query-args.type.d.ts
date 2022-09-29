import { Class } from '@nestjs-query/core';
import { CursorQueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
import { PagingStrategies } from '../paging';
export declare type CursorQueryArgsType<DTO> = QueryType<DTO, PagingStrategies.CURSOR>;
export declare function createCursorQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: CursorQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.CURSOR>;
