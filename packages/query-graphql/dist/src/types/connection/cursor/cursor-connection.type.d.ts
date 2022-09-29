import { Class } from '@nestjs-query/core';
import { PagingStrategies } from '../../query';
import { CursorConnectionOptions, StaticConnectionType } from '../interfaces';
export declare function getOrCreateCursorConnectionType<DTO>(TItemClass: Class<DTO>, maybeOpts?: CursorConnectionOptions): StaticConnectionType<DTO, PagingStrategies.CURSOR>;
