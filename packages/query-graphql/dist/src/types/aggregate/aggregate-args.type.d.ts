import { Filter, Class } from '@nestjs-query/core';
export interface AggregateArgsType<DTO> {
    filter?: Filter<DTO>;
}
/**
 * The args type for aggregate queries
 * @param DTOClass - The class the aggregate is for. This will be used to create FilterType.
 */
export declare function AggregateArgsType<DTO>(DTOClass: Class<DTO>): Class<AggregateArgsType<DTO>>;
