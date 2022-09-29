import { Class, MetaValue } from '@nestjs-query/core';
import { AuthorizerOptions, Authorizer, CustomAuthorizer } from '../auth';
export declare function Authorize<DTO>(optsOrAuthorizerOrClass: Class<CustomAuthorizer<DTO>> | CustomAuthorizer<DTO> | AuthorizerOptions<DTO>): (DTOClass: Class<DTO>) => void;
export declare const getAuthorizer: <DTO>(DTOClass: Class<DTO>) => MetaValue<Class<Authorizer<DTO>>>;
export declare const getCustomAuthorizer: <DTO>(DTOClass: Class<DTO>) => MetaValue<Class<CustomAuthorizer<DTO>>>;
