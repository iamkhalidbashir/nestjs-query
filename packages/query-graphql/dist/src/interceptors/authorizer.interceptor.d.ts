import { Class } from '@nestjs-query/core';
import { NestInterceptor } from '@nestjs/common';
import { Authorizer } from '../auth';
export declare type AuthorizerContext<DTO> = {
    authorizer: Authorizer<DTO>;
};
export declare function AuthorizerInterceptor<DTO>(DTOClass: Class<DTO>): Class<NestInterceptor>;
