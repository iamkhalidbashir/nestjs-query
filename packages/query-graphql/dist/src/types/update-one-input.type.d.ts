import { Class } from '@nestjs-query/core';
export interface UpdateOneInputType<U> {
    id: string | number;
    update: U;
}
/**
 * The abstract input type for update one endpoints.
 * @param DTOClass - The base DTO class the UpdateType is based on.
 * @param UpdateType - The InputType to use for the update field.
 */
export declare function UpdateOneInputType<DTO, U>(DTOClass: Class<DTO>, UpdateType: Class<U>): Class<UpdateOneInputType<U>>;
