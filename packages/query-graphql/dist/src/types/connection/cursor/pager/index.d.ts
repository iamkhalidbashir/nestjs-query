import { Class } from '@nestjs-query/core';
import { Pager } from '../../interfaces';
import { CursorPagerResult } from './interfaces';
export declare type PagerOpts = {
    disableKeySetPagination?: boolean;
};
export declare const createPager: <DTO>(DTOClass: Class<DTO>, opts: PagerOpts) => Pager<DTO, CursorPagerResult<DTO>>;
