import { Filter, Class } from '@nestjs-query/core';
export interface SubscriptionFilterInputType<DTO> {
    filter?: Filter<DTO>;
}
/**
 * Input abstract type for all subscription filters.
 * @param DTOClass - The DTO used to create a FilterType for the filter.
 */
export declare function SubscriptionFilterInputType<DTO>(DTOClass: Class<DTO>): Class<SubscriptionFilterInputType<DTO>>;
