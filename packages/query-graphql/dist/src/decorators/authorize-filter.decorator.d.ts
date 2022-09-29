import { AuthorizationContext } from '../auth';
declare type PartialAuthorizationContext = Partial<AuthorizationContext> & Pick<AuthorizationContext, 'operationGroup' | 'many'>;
export declare function AuthorizerFilter<DTO>(partialAuthContext?: PartialAuthorizationContext): ParameterDecorator;
export declare function RelationAuthorizerFilter<DTO>(relationName: string, partialAuthContext?: PartialAuthorizationContext): ParameterDecorator;
export declare function ModifyRelationAuthorizerFilter<DTO>(relationName: string, partialAuthContext?: PartialAuthorizationContext): ParameterDecorator;
export {};
