import { Paging, Query } from '@nestjs-query/core';
import { OffsetConnectionType, PagerResult } from '../../interfaces';
export declare type OffsetPagingOpts = Required<Paging>;
export interface OffsetPagingMeta<DTO> {
    opts: OffsetPagingOpts;
    query: Query<DTO>;
}
export interface QueryResults<DTO> {
    nodes: DTO[];
    hasExtraNode: boolean;
}
export declare type OffsetPagerResult<DTO> = PagerResult & Omit<OffsetConnectionType<DTO>, 'totalCount'>;
