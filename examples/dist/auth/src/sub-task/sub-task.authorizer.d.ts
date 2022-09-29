import { Authorizer, AuthorizationContext } from '@nestjs-query/query-graphql';
import { Filter } from '@nestjs-query/core';
import { UserContext } from '../auth/auth.interfaces';
import { SubTaskDTO } from './dto/sub-task.dto';
export declare class SubTaskAuthorizer implements Authorizer<SubTaskDTO> {
    authorize(context: UserContext, authorizationContext?: AuthorizationContext): Promise<Filter<SubTaskDTO>>;
    authorizeRelation(relationName: string, context: UserContext): Promise<Filter<unknown>>;
}
