import { Filter } from '@nestjs-query/core';
export declare enum OperationGroup {
    READ = "read",
    AGGREGATE = "aggregate",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}
export interface AuthorizationContext {
    /** The name of the method that uses the @AuthorizeFilter decorator */
    readonly operationName: string;
    /** The group this operation belongs to */
    readonly operationGroup: OperationGroup;
    /** If the operation does not modify any entities */
    readonly readonly: boolean;
    /** If the operation can affect multiple entities */
    readonly many: boolean;
}
export interface CustomAuthorizer<DTO> {
    authorize(context: any, authorizerContext: AuthorizationContext): Promise<Filter<DTO>>;
    authorizeRelation?(relationName: string, context: any, authorizerContext: AuthorizationContext): Promise<Filter<unknown> | undefined>;
}
export interface Authorizer<DTO> extends CustomAuthorizer<DTO> {
    authorize(context: any, authorizerContext: AuthorizationContext): Promise<Filter<DTO>>;
    authorizeRelation(relationName: string, context: any, authorizerContext: AuthorizationContext): Promise<Filter<unknown | undefined>>;
}
