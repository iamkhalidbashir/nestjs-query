import { Filter, Class } from '@nestjs-query/core';
export interface DeleteManyInputType<T> {
    filter: Filter<T>;
}
/**
 * The abstract input type or delete many endpoints.
 * @param DTOClass - The class the delete many input type is for. This will be used to create FilterType.
 */
export declare function DeleteManyInputType<DTO>(DTOClass: Class<DTO>): Class<DeleteManyInputType<DTO>>;
