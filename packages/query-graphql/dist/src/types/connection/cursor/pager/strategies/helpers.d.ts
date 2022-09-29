import { CursorPagingType } from '../../../../query';
export declare function isBackwardPaging(cursor: CursorPagingType): boolean;
export declare function isForwardPaging(cursor: CursorPagingType): boolean;
export declare function hasBeforeCursor(cursor: CursorPagingType): boolean;
export declare function encodeBase64(str: string): string;
export declare function decodeBase64(str: string): string;
