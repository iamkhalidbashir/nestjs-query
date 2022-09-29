"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const src_1 = require("../../src");
const auth_1 = require("../../src/auth");
const providers_1 = require("../../src/providers");
describe('createDefaultAuthorizer', () => {
    let testingModule;
    class TestRelation {
    }
    let RelationAuthorizer = class RelationAuthorizer {
        authorize(context) {
            return Promise.resolve({ authorizerOwnerId: { eq: context.user.id } });
        }
        authorizeRelation() {
            return Promise.reject(new Error('should not have called'));
        }
    };
    RelationAuthorizer = (0, tslib_1.__decorate)([
        (0, common_1.Injectable)()
    ], RelationAuthorizer);
    let RelationWithAuthorizer = class RelationWithAuthorizer {
    };
    RelationWithAuthorizer = (0, tslib_1.__decorate)([
        (0, src_1.Authorize)(RelationAuthorizer)
    ], RelationWithAuthorizer);
    let TestDecoratorRelation = class TestDecoratorRelation {
    };
    TestDecoratorRelation = (0, tslib_1.__decorate)([
        (0, src_1.Authorize)({
            authorize: (ctx) => ({
                decoratorOwnerId: { eq: ctx.user.id },
            }),
        })
    ], TestDecoratorRelation);
    let TestDTO = class TestDTO {
    };
    TestDTO = (0, tslib_1.__decorate)([
        (0, src_1.Authorize)({
            authorize: (ctx, authorizationContext) => (authorizationContext === null || authorizationContext === void 0 ? void 0 : authorizationContext.operationName) === 'other'
                ? { ownerId: { neq: ctx.user.id } }
                : { ownerId: { eq: ctx.user.id } },
        }),
        (0, src_1.Relation)('relations', () => TestRelation, {
            auth: {
                authorize: (ctx, authorizationContext) => (authorizationContext === null || authorizationContext === void 0 ? void 0 : authorizationContext.operationName) === 'other'
                    ? { relationOwnerId: { neq: ctx.user.id } }
                    : { relationOwnerId: { eq: ctx.user.id } },
            },
        }),
        (0, src_1.UnPagedRelation)('unPagedDecoratorRelations', () => TestDecoratorRelation),
        (0, src_1.Relation)('authorizerRelation', () => RelationWithAuthorizer)
    ], TestDTO);
    class TestNoAuthDTO {
    }
    let TestWithAuthorizerAuthorizer = class TestWithAuthorizerAuthorizer {
        authorize(context) {
            return Promise.resolve({ ownerId: { eq: context.user.id } });
        }
        authorizeRelation() {
            return Promise.resolve(undefined);
        }
    };
    TestWithAuthorizerAuthorizer = (0, tslib_1.__decorate)([
        (0, common_1.Injectable)()
    ], TestWithAuthorizerAuthorizer);
    let TestWithAuthorizerDTO = class TestWithAuthorizerDTO {
    };
    TestWithAuthorizerDTO = (0, tslib_1.__decorate)([
        (0, src_1.Authorize)(TestWithAuthorizerAuthorizer),
        (0, src_1.Relation)('relations', () => TestRelation, {
            auth: {
                authorize: (ctx, authorizationContext) => (authorizationContext === null || authorizationContext === void 0 ? void 0 : authorizationContext.operationName) === 'other'
                    ? { relationOwnerId: { neq: ctx.user.id } }
                    : { relationOwnerId: { eq: ctx.user.id } },
            },
        }),
        (0, src_1.UnPagedRelation)('unPagedDecoratorRelations', () => TestDecoratorRelation),
        (0, src_1.Relation)('authorizerRelation', () => RelationWithAuthorizer)
    ], TestWithAuthorizerDTO);
    beforeEach(async () => {
        testingModule = await testing_1.Test.createTestingModule({
            providers: [
                ...(0, providers_1.createAuthorizerProviders)([
                    TestDecoratorRelation,
                    TestRelation,
                    RelationWithAuthorizer,
                    TestDTO,
                    TestNoAuthDTO,
                    TestWithAuthorizerDTO,
                ]),
            ],
        }).compile();
    });
    afterAll(() => testingModule.close());
    it('should create an auth filter', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorize({ user: { id: 2 } }, {
            operationName: 'queryMany',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ ownerId: { eq: 2 } });
    });
    it('should create an auth filter that depends on the passed operation name', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorize({ user: { id: 2 } }, {
            operationName: 'other',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ ownerId: { neq: 2 } });
    });
    it('should return an empty filter if auth not found', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestNoAuthDTO));
        const filter = await authorizer.authorize({ user: { id: 2 } }, {
            operationName: 'queryMany',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({});
    });
    it('should create an auth filter for relations using the default auth decorator', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorizeRelation('unPagedDecoratorRelations', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ decoratorOwnerId: { eq: 2 } });
    });
    it('should create an auth filter for relations using the relation options', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorizeRelation('relations', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ relationOwnerId: { eq: 2 } });
    });
    it('should create an auth filter that depends on the passed operation name for relations using the relation options', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorizeRelation('relations', { user: { id: 2 } }, {
            operationName: 'other',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ relationOwnerId: { neq: 2 } });
    });
    it('should create an auth filter for relations using the relation authorizer', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorizeRelation('authorizerRelation', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({ authorizerOwnerId: { eq: 2 } });
    });
    it('should return an empty object for an unknown relation', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestDTO));
        const filter = await authorizer.authorizeRelation('unknownRelations', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({});
    });
    it('should call authorizeRelation of authorizer and fallback to authorize decorator', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestWithAuthorizerDTO));
        jest.spyOn(authorizer, 'authorizeRelation');
        const customAuthorizer = testingModule.get((0, auth_1.getCustomAuthorizerToken)(TestWithAuthorizerDTO));
        jest.spyOn(customAuthorizer, 'authorizeRelation');
        expect(customAuthorizer).toBeDefined();
        const filter = await authorizer.authorizeRelation('unPagedDecoratorRelations', { user: { id: 2 } }, {
            operationName: 'queryMany',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({
            decoratorOwnerId: { eq: 2 },
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(customAuthorizer.authorizeRelation).toHaveBeenCalledWith('unPagedDecoratorRelations', { user: { id: 2 } }, {
            operationName: 'queryMany',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(authorizer.authorizeRelation).toHaveBeenCalledWith('unPagedDecoratorRelations', { user: { id: 2 } }, {
            operationName: 'queryMany',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
    });
    it('should call authorizeRelation of authorizer and fallback to custom authorizer of relation', async () => {
        const authorizer = testingModule.get((0, auth_1.getAuthorizerToken)(TestWithAuthorizerDTO));
        jest.spyOn(authorizer, 'authorizeRelation');
        const customAuthorizer = testingModule.get((0, auth_1.getCustomAuthorizerToken)(TestWithAuthorizerDTO));
        jest.spyOn(customAuthorizer, 'authorizeRelation');
        expect(customAuthorizer).toBeDefined();
        const relationAuthorizer = testingModule.get((0, auth_1.getAuthorizerToken)(RelationWithAuthorizer));
        jest.spyOn(relationAuthorizer, 'authorize');
        const customRelationAuthorizer = testingModule.get((0, auth_1.getCustomAuthorizerToken)(RelationWithAuthorizer));
        jest.spyOn(customRelationAuthorizer, 'authorize');
        const filter = await authorizer.authorizeRelation('authorizerRelation', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        expect(filter).toEqual({
            authorizerOwnerId: { eq: 2 },
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(customAuthorizer.authorizeRelation).toHaveBeenCalledWith('authorizerRelation', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(authorizer.authorizeRelation).toHaveBeenCalledWith('authorizerRelation', { user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(relationAuthorizer.authorize).toHaveBeenCalledWith({ user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(customRelationAuthorizer.authorize).toHaveBeenCalledWith({ user: { id: 2 } }, {
            operationName: 'queryRelation',
            operationGroup: auth_1.OperationGroup.READ,
            readonly: true,
            many: true,
        });
    });
});
//# sourceMappingURL=default-crud-auth.service.spec.js.map