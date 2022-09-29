import { GraphQLSchemaHost } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { LoggerService } from '@nestjs/common';
export declare class ComplexityPlugin implements ApolloServerPlugin {
    private gqlSchemaHost;
    readonly logger: LoggerService;
    private maxComplexity;
    constructor(gqlSchemaHost: GraphQLSchemaHost);
    requestDidStart(): Promise<GraphQLRequestListener>;
}
