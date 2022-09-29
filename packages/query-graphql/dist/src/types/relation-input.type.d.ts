import { Class } from '@nestjs-query/core';
export interface RelationInputType {
    id: string | number;
    relationId: string | number;
}
export declare function RelationInputType(DTOClass: Class<unknown>, RelationClass: Class<unknown>): Class<RelationInputType>;
