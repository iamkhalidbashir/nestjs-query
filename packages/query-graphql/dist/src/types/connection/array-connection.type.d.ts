import { Class } from '@nestjs-query/core';
import { PagingStrategies } from '../query';
import { StaticConnectionType } from './interfaces';
export declare function getOrCreateArrayConnectionType<DTO>(TItemClass: Class<DTO>): StaticConnectionType<DTO, PagingStrategies.NONE>;
