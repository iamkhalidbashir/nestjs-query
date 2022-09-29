import { Query } from '@nestjs-query/core';
import { CursorPagingType } from '../../../../query';
import { OffsetPagingOpts, PagerStrategy } from './pager-strategy';
export declare class LimitOffsetPagerStrategy<DTO> implements PagerStrategy<DTO> {
    private static CURSOR_PREFIX;
    toCursor(dto: DTO, index: number, pagingOpts: OffsetPagingOpts): string;
    fromCursorArgs(cursor: CursorPagingType): OffsetPagingOpts;
    isEmptyCursor(opts: OffsetPagingOpts): boolean;
    createQuery<Q extends Query<DTO>>(query: Q, opts: OffsetPagingOpts, includeExtraNode: boolean): Q;
    checkForExtraNode(nodes: DTO[], opts: OffsetPagingOpts): DTO[];
    private getLimit;
    private getOffset;
    private static offsetToCursor;
    private static cursorToOffset;
}
