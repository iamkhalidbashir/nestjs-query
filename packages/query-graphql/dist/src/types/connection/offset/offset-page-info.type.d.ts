import { OffsetPageInfoType } from '../interfaces';
export interface OffsetPageInfoTypeConstructor {
    new (hasNextPage: boolean, hasPreviousPage: boolean): OffsetPageInfoType;
}
export declare const getOrCreateOffsetPageInfoType: () => OffsetPageInfoTypeConstructor;
