import { Class } from '@nestjs-query/core';
import { PubSub } from 'graphql-subscriptions';
import { Authorizer } from '../../src';
import { TestService } from './test-resolver.service';
import { TestResolverDTO } from './test-resolver.dto';
export { TestResolverInputDTO } from './test-resolver-input.dto';
export { TestResolverDTO } from './test-resolver.dto';
export { TestResolverAuthorizer } from './test-resolver.authorizer';
export { TestService } from './test-resolver.service';
export { TestRelationDTO } from './test-relation.dto';
export declare const generateSchema: (resolvers: Function[]) => Promise<string>;
interface ResolverMock<T> {
    resolver: T;
    mockService: TestService;
    mockPubSub: PubSub;
    mockAuthorizer: Authorizer<TestResolverDTO>;
}
export declare const createResolverFromNest: <T>(ResolverClass: Class<T>, DTOClass?: Class<unknown>) => Promise<ResolverMock<T>>;
