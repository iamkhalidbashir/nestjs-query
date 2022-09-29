import { Filter, Class } from '@nestjs-query/core';
export interface UpdateManyInputType<DTO, U> {
    filter: Filter<DTO>;
    update: U;
}
/**
 * Input abstract type for all update many endpoints.
 * @param DTOClass - The DTO used to create a FilterType for the update.
 * @param UpdateType - The InputType to use for the update field.
 */
export declare function UpdateManyInputType<DTO, U>(DTOClass: Class<DTO>, UpdateType: Class<U>): Class<UpdateManyInputType<DTO, U>>;
