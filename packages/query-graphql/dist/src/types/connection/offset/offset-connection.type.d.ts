import { Class } from '@nestjs-query/core';
import { PagingStrategies } from '../../query';
import { OffsetConnectionOptions, StaticConnectionType } from '../interfaces';
export declare function getOrCreateOffsetConnectionType<DTO>(TItemClass: Class<DTO>, opts: OffsetConnectionOptions): StaticConnectionType<DTO, PagingStrategies.OFFSET>;
