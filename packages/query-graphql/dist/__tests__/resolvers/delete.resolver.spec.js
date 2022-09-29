"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const subscription_1 = require("../../src/subscription");
const __fixtures__1 = require("../__fixtures__");
describe('DeleteResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.DeleteResolver)(__fixtures__1.TestResolverDTO, opts) {
            test() {
                return { id: '1', stringField: 'foo' };
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Query)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__metadata)("design:type", Function),
            (0, tslib_1.__metadata)("design:paramtypes", []),
            (0, tslib_1.__metadata)("design:returntype", __fixtures__1.TestResolverDTO)
        ], TestSDLResolver.prototype, "test", null);
        TestSDLResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO)
        ], TestSDLResolver);
        const schema = await (0, __fixtures__1.generateSchema)([TestSDLResolver]);
        expect(schema).toMatchSnapshot();
    };
    const createTestResolver = (opts) => {
        let TestResolver = class TestResolver extends (0, src_1.DeleteResolver)(__fixtures__1.TestResolverDTO, opts) {
            constructor(service, pubSub) {
                super(service);
                this.pubSub = pubSub;
            }
        };
        TestResolver = (0, tslib_1.__decorate)([
            (0, graphql_1.Resolver)(() => __fixtures__1.TestResolverDTO),
            (0, tslib_1.__param)(1, (0, src_1.InjectPubSub)()),
            (0, tslib_1.__metadata)("design:paramtypes", [__fixtures__1.TestService, graphql_subscriptions_1.PubSub])
        ], TestResolver);
        return (0, __fixtures__1.createResolverFromNest)(TestResolver);
    };
    it('should create a DeleteResolver for the DTO', () => expectResolverSDL());
    it('should use the dtoName if provided', () => expectResolverSDL({ dtoName: 'Test' }));
    it('should use the one.name option for the deleteOne if provided', () => expectResolverSDL({ one: { name: 'delete_one_test' } }));
    it('should use the many.name option for the deleteMany if provided', () => expectResolverSDL({ many: { name: 'delete_many_test' } }));
    it('should not expose delete methods if disabled', () => expectResolverSDL({ disabled: true }));
    describe('#deleteOne', () => {
        it('should use the provided DeleteOneInput type', () => {
            let CustomDeleteOneInput = class CustomDeleteOneInput {
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomDeleteOneInput.prototype, "id", void 0);
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomDeleteOneInput.prototype, "foo", void 0);
            CustomDeleteOneInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CustomDeleteOneInput);
            return expectResolverSDL({ DeleteOneInput: CustomDeleteOneInput });
        });
        it('should not expose delete one method if disabled', () => expectResolverSDL({ one: { disabled: true } }));
        it('should call the service deleteOne with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                id: 'id-1',
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
            const result = await resolver.deleteOne({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service deleteOne with the provided input and authorizer filter', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                id: 'id-1',
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const authorizeFilter = { stringField: { eq: 'foo' } };
            (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.deleteOne({ input }, authorizeFilter);
            return expect(result).toEqual(output);
        });
    });
    describe('#deleteMany', () => {
        it('should not create a new delete type if the DeleteManyArgs is supplied', () => {
            let CustomDeleteManyInput = class CustomDeleteManyInput extends (0, src_1.DeleteManyInputType)(__fixtures__1.TestResolverDTO) {
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomDeleteManyInput.prototype, "foo", void 0);
            CustomDeleteManyInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CustomDeleteManyInput);
            return expectResolverSDL({ DeleteManyInput: CustomDeleteManyInput });
        });
        it('should not expose delete many method if disabled', () => expectResolverSDL({ many: { disabled: true } }));
        it('should call the service deleteMany with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                filter: { id: { eq: 'id-1' } },
            };
            const output = { deletedCount: 1 };
            (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(output);
            const result = await resolver.deleteMany({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service deleteMany with the provided input and auth filter', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                filter: { id: { eq: 'id-1' } },
            };
            const output = { deletedCount: 1 };
            const authorizeFilter = { stringField: { eq: 'foo' } };
            (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)({ and: [authorizeFilter, input.filter] }))).thenResolve(output);
            const result = await resolver.deleteMany({ input }, authorizeFilter);
            return expect(result).toEqual(output);
        });
    });
    describe('deleted subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => expectResolverSDL({ enableSubscriptions: true }));
        it('should add subscription types if one.enableSubscriptions is true', () => expectResolverSDL({ one: { enableSubscriptions: true } }));
        it('should add subscription types if many.enableSubscriptions is true', () => expectResolverSDL({ many: { enableSubscriptions: true } }));
        it('should not expose subscriptions if enableSubscriptions is false', () => expectResolverSDL({ enableSubscriptions: false }));
        describe('delete one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.deleteOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    one: { enableSubscriptions: true },
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.deleteOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                const result = await resolver.deleteOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const input = {
                    id: 'id-1',
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.deleteOne(input.id, (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                const result = await resolver.deleteOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('delete many events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.deleteMany({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create manhy when many.enableSubscriptions is true', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.deleteMany({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(output);
                const result = await resolver.deleteMany({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const input = {
                    filter: { id: { eq: 'id-1' } },
                };
                const output = { deletedCount: 1 };
                (0, ts_mockito_1.when)(mockService.deleteMany((0, ts_mockito_1.objectContaining)(input.filter))).thenResolve(output);
                const result = await resolver.deleteMany({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('deletedOneSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, __fixtures__1.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = (0, ts_mockito_1.mock)();
                (0, ts_mockito_1.when)(mockPubSub.asyncIterator(eventName)).thenReturn((0, ts_mockito_1.instance)(mockIterator));
                (0, ts_mockito_1.when)(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.deletedOneSubscription().next();
                (0, ts_mockito_1.verify)(mockPubSub.asyncIterator(eventName)).once();
                return expect(result).toEqual({
                    done: false,
                    value: event,
                });
            });
            it('should not propagate events if enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.deletedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.deletedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
        describe('deletedManySubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, __fixtures__1.TestResolverDTO);
                const event = { deletedCount: 1 };
                const mockIterator = (0, ts_mockito_1.mock)();
                (0, ts_mockito_1.when)(mockPubSub.asyncIterator(eventName)).thenReturn((0, ts_mockito_1.instance)(mockIterator));
                (0, ts_mockito_1.when)(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.deletedManySubscription().next();
                (0, ts_mockito_1.verify)(mockPubSub.asyncIterator(eventName)).once();
                return expect(result).toEqual({
                    done: false,
                    value: event,
                });
            });
            it('should not propagate events if enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.deletedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.deletedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=delete.resolver.spec.js.map