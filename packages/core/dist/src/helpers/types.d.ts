import { CommonFieldComparisonBetweenType } from '../interfaces';
export declare type FilterFn<DTO> = (dto?: DTO) => boolean;
export declare type ComparisonField<DTO, F extends keyof DTO> = DTO[F] | DTO[F][] | CommonFieldComparisonBetweenType<DTO[F]> | true | false | null;
