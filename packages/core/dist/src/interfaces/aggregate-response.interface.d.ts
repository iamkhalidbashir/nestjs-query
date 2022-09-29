export declare type NumberAggregate<DTO> = {
    [K in keyof DTO]?: number;
};
export declare type TypeAggregate<DTO> = {
    [K in keyof DTO]?: DTO[K];
};
export declare type AggregateResponse<DTO> = {
    count?: NumberAggregate<DTO>;
    sum?: NumberAggregate<DTO>;
    avg?: NumberAggregate<DTO>;
    max?: TypeAggregate<DTO>;
    min?: TypeAggregate<DTO>;
    groupBy?: Partial<DTO>;
};
