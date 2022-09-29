import { Class } from '@nestjs-query/core';
export interface RelationsInputType {
    id: string | number;
    relationIds: (string | number)[];
}
export declare function RelationsInputType(DTOClass: Class<unknown>, RelationClass: Class<unknown>): Class<RelationsInputType>;
