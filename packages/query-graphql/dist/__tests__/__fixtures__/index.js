"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolverFromNest = exports.generateSchema = exports.TestRelationDTO = exports.TestService = exports.TestResolverAuthorizer = exports.TestResolverDTO = exports.TestResolverInputDTO = void 0;
const graphql_1 = require("graphql");
const testing_1 = require("@nestjs/testing");
const graphql_2 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const test_resolver_service_1 = require("./test-resolver.service");
const test_resolver_dto_1 = require("./test-resolver.dto");
const test_resolver_authorizer_1 = require("./test-resolver.authorizer");
const auth_1 = require("../../src/auth");
var test_resolver_input_dto_1 = require("./test-resolver-input.dto");
Object.defineProperty(exports, "TestResolverInputDTO", { enumerable: true, get: function () { return test_resolver_input_dto_1.TestResolverInputDTO; } });
var test_resolver_dto_2 = require("./test-resolver.dto");
Object.defineProperty(exports, "TestResolverDTO", { enumerable: true, get: function () { return test_resolver_dto_2.TestResolverDTO; } });
var test_resolver_authorizer_2 = require("./test-resolver.authorizer");
Object.defineProperty(exports, "TestResolverAuthorizer", { enumerable: true, get: function () { return test_resolver_authorizer_2.TestResolverAuthorizer; } });
var test_resolver_service_2 = require("./test-resolver.service");
Object.defineProperty(exports, "TestService", { enumerable: true, get: function () { return test_resolver_service_2.TestService; } });
var test_relation_dto_1 = require("./test-relation.dto");
Object.defineProperty(exports, "TestRelationDTO", { enumerable: true, get: function () { return test_relation_dto_1.TestRelationDTO; } });
const getOrCreateSchemaFactory = async () => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [graphql_2.GraphQLSchemaBuilderModule],
    }).compile();
    return moduleRef.get(graphql_2.GraphQLSchemaFactory);
};
// eslint-disable-next-line @typescript-eslint/ban-types
const generateSchema = async (resolvers) => {
    const sf = await getOrCreateSchemaFactory();
    const schema = await sf.create(resolvers);
    return (0, graphql_1.printSchema)(schema);
};
exports.generateSchema = generateSchema;
const createResolverFromNest = async (ResolverClass, DTOClass = test_resolver_dto_1.TestResolverDTO) => {
    const mockService = (0, ts_mockito_1.mock)(test_resolver_service_1.TestService);
    const mockPubSub = (0, ts_mockito_1.mock)(graphql_subscriptions_1.PubSub);
    const mockAuthorizer = (0, ts_mockito_1.mock)(test_resolver_authorizer_1.TestResolverAuthorizer);
    const moduleRef = await testing_1.Test.createTestingModule({
        providers: [
            ResolverClass,
            test_resolver_service_1.TestService,
            { provide: (0, auth_1.getAuthorizerToken)(DTOClass), useValue: (0, ts_mockito_1.instance)(mockAuthorizer) },
            { provide: (0, src_1.pubSubToken)(), useValue: (0, ts_mockito_1.instance)(mockPubSub) },
        ],
    })
        .overrideProvider(test_resolver_service_1.TestService)
        .useValue((0, ts_mockito_1.instance)(mockService))
        .compile();
    return { resolver: moduleRef.get(ResolverClass), mockService, mockPubSub, mockAuthorizer };
};
exports.createResolverFromNest = createResolverFromNest;
//# sourceMappingURL=index.js.map