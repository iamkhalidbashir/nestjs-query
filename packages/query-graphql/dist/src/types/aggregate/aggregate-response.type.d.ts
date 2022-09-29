import { AggregateResponse, Class } from '@nestjs-query/core';
export declare type AggregateResponseOpts = {
    prefix: string;
};
export declare function AggregateResponseType<DTO>(DTOClass: Class<DTO>, opts?: AggregateResponseOpts): Class<AggregateResponse<DTO>>;
