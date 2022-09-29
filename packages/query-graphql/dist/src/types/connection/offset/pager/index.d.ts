import { Pager } from '../../interfaces';
import { OffsetPagerResult } from './interfaces';
export { OffsetPagerResult } from './interfaces';
export declare const createPager: <DTO>() => Pager<DTO, OffsetPagerResult<DTO>>;
