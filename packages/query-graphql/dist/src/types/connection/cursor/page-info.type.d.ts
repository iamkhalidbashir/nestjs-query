import { ConnectionCursorType } from '../../cursor.scalar';
import { PageInfoType } from '../interfaces';
export interface PageInfoTypeConstructor {
    new (hasNextPage: boolean, hasPreviousPage: boolean, startCursor: ConnectionCursorType | undefined, endCursor: ConnectionCursorType | undefined): PageInfoType;
}
export declare const getOrCreatePageInfoType: () => PageInfoTypeConstructor;
