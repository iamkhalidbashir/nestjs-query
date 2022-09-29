"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_mockito_1 = require("ts-mockito");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const subscription_1 = require("../../src/subscription");
const __fixtures__1 = require("../__fixtures__");
describe('UpdateResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.UpdateResolver)(__fixtures__1.TestResolverDTO, opts) {
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
        let TestResolver = class TestResolver extends (0, src_1.UpdateResolver)(__fixtures__1.TestResolverDTO, opts) {
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
    it('should create a UpdateResolver for the DTO', () => expectResolverSDL());
    it('should use the dtoName if provided', () => expectResolverSDL({ dtoName: 'Test' }));
    it('should use the one.name option for the updateOne if provided', () => expectResolverSDL({ one: { name: 'update_one_test' } }));
    it('should use the many.name option for the updateMany if provided', () => expectResolverSDL({ many: { name: 'update_many_test' } }));
    it('should use the UpdateDTOClass if provided', () => expectResolverSDL({ UpdateDTOClass: __fixtures__1.TestResolverInputDTO }));
    it('should not expose update methods if disabled', () => expectResolverSDL({ disabled: true }));
    describe('#updateOne', () => {
        it('should use the provided UpdateOneInput type', () => {
            let CustomUpdateOneInput = class CustomUpdateOneInput extends (0, src_1.UpdateOneInputType)(__fixtures__1.TestResolverDTO, __fixtures__1.TestResolverInputDTO) {
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomUpdateOneInput.prototype, "other", void 0);
            CustomUpdateOneInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CustomUpdateOneInput);
            return expectResolverSDL({ UpdateOneInput: CustomUpdateOneInput });
        });
        it('should not expose update one method if disabled', () => expectResolverSDL({ one: { disabled: true } }));
        it('should call the service updateOne with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                id: 'id-1',
                update: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
            const result = await resolver.updateOne({ input });
            return expect(result).toEqual(output);
        });
        it('should call the service updateOne with the provided input and optional auth filter', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                id: 'id-1',
                update: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            const authorizeFilter = { stringField: { eq: 'foo' } };
            (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: authorizeFilter }))).thenResolve(output);
            const result = await resolver.updateOne({ input }, authorizeFilter);
            return expect(result).toEqual(output);
        });
    });
    describe('#updateMany', () => {
        it('should not update a new type if the UpdateManyArgs is supplied', () => {
            let CustomUpdateManyInput = class CustomUpdateManyInput extends (0, src_1.UpdateManyInputType)(__fixtures__1.TestResolverDTO, __fixtures__1.TestResolverInputDTO) {
            };
            (0, tslib_1.__decorate)([
                (0, graphql_1.Field)(),
                (0, tslib_1.__metadata)("design:type", String)
            ], CustomUpdateManyInput.prototype, "other", void 0);
            CustomUpdateManyInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CustomUpdateManyInput);
            return expectResolverSDL({ UpdateManyInput: CustomUpdateManyInput });
        });
        it('should not expose update many method if disabled', () => expectResolverSDL({ many: { disabled: true } }));
        it('should call the service updateMany with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                input: {
                    filter: { id: { eq: 'id-1' } },
                    update: {
                        stringField: 'foo',
                    },
                },
            };
            const output = { updatedCount: 1 };
            (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)(input.input.filter))).thenResolve(output);
            const result = await resolver.updateMany(input);
            return expect(result).toEqual(output);
        });
        it('should call the service updateMany with the provided input and the auth filter', async () => {
            const { resolver, mockService } = await createTestResolver();
            const input = {
                input: {
                    filter: { id: { eq: 'id-1' } },
                    update: {
                        stringField: 'foo',
                    },
                },
            };
            const output = { updatedCount: 1 };
            const authorizeFilter = { stringField: { eq: 'foo' } };
            (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)({ and: [authorizeFilter, input.input.filter] }))).thenResolve(output);
            const result = await resolver.updateMany(input, authorizeFilter);
            return expect(result).toEqual(output);
        });
    });
    describe('updated subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => expectResolverSDL({ enableSubscriptions: true }));
        it('should add subscription types if one.enableSubscriptions is true', () => expectResolverSDL({ one: { enableSubscriptions: true } }));
        it('should add subscription types if many.enableSubscriptions is true', () => expectResolverSDL({ many: { enableSubscriptions: true } }));
        it('should not expose subscriptions if enableSubscriptions is false', () => expectResolverSDL({ enableSubscriptions: false }));
        describe('update one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.updateOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    one: { enableSubscriptions: true },
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.updateOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: false,
                });
                const input = {
                    id: 'id-1',
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const context = {};
                (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                const result = await resolver.updateOne({ input }, context);
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
                    update: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.updateOne(input.id, (0, ts_mockito_1.objectContaining)(input.update), (0, ts_mockito_1.deepEqual)({ filter: {} }))).thenResolve(output);
                const result = await resolver.updateOne({ input });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('update many events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)(input.input.filter))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.updateMany(input);
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create manhy when many.enableSubscriptions is true', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)(input.input.filter))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.updateMany(input);
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)(input.input.filter))).thenResolve(output);
                const result = await resolver.updateMany(input);
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const input = {
                    input: {
                        filter: { id: { eq: 'id-1' } },
                        update: {
                            stringField: 'foo',
                        },
                    },
                };
                const output = { updatedCount: 1 };
                (0, ts_mockito_1.when)(mockService.updateMany((0, ts_mockito_1.objectContaining)(input.input.update), (0, ts_mockito_1.objectContaining)(input.input.filter))).thenResolve(output);
                const result = await resolver.updateMany(input);
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('updatedOneSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, __fixtures__1.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = (0, ts_mockito_1.mock)();
                (0, ts_mockito_1.when)(mockPubSub.asyncIterator(eventName)).thenReturn((0, ts_mockito_1.instance)(mockIterator));
                (0, ts_mockito_1.when)(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.updatedOneSubscription().next();
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
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.updatedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.updatedOneSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
        describe('updatedManySubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, __fixtures__1.TestResolverDTO);
                const event = { updatedCount: 1 };
                const mockIterator = (0, ts_mockito_1.mock)();
                (0, ts_mockito_1.when)(mockPubSub.asyncIterator(eventName)).thenReturn((0, ts_mockito_1.instance)(mockIterator));
                (0, ts_mockito_1.when)(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.updatedManySubscription().next();
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
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.updatedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
            it('should not propagate events if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.updatedManySubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=update.resolver.spec.js.map