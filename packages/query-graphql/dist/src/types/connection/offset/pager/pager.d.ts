import { Query } from '@nestjs-query/core';
import { Count, Pager, QueryMany } from '../../interfaces';
import { OffsetPagerResult } from './interfaces';
export declare class OffsetPager<DTO> implements Pager<DTO, OffsetPagerResult<DTO>> {
    page<Q extends Query<DTO>>(queryMany: QueryMany<DTO, Q>, query: Q, count: Count<DTO>): Promise<OffsetPagerResult<DTO>>;
    private isValidPaging;
    private runQuery;
    private getPageMeta;
    private createPagingResult;
    private createQuery;
    private checkForExtraNode;
}
