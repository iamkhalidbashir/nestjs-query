import { Filter } from '../interfaces';
import { FilterFn } from './types';
export declare class FilterBuilder {
    static build<DTO>(filter: Filter<DTO>): FilterFn<DTO>;
    private static andFilterFn;
    private static orFilterFn;
    private static filterFieldsOrNested;
    private static withFilterComparison;
    private static withComparison;
}
