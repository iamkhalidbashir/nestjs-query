import { Class } from '@nestjs-query/core';
export interface FindOneArgsType {
    id: string | number;
}
/**
 * The input type for delete one endpoints.
 */
export declare function FindOneArgsType(DTOClass: Class<unknown>): Class<FindOneArgsType>;
