import { Class, Filter } from '@nestjs-query/core';
import { Authorizer, AuthorizationContext, CustomAuthorizer } from './authorizer';
export interface AuthorizerOptions<DTO> {
    authorize: (context: any, authorizationContext: AuthorizationContext) => Filter<DTO> | Promise<Filter<DTO>>;
}
export declare function createDefaultAuthorizer<DTO>(DTOClass: Class<DTO>, opts?: CustomAuthorizer<DTO> | AuthorizerOptions<DTO>): Class<Authorizer<DTO>>;
