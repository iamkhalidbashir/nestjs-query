"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const ts_mockito_1 = require("ts-mockito");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const src_1 = require("../../src");
const subscription_1 = require("../../src/subscription");
const __fixtures__1 = require("../__fixtures__");
describe('CreateResolver', () => {
    const expectResolverSDL = async (opts) => {
        let TestSDLResolver = class TestSDLResolver extends (0, src_1.CreateResolver)(__fixtures__1.TestResolverDTO, opts) {
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
        let TestResolver = class TestResolver extends (0, src_1.CreateResolver)(__fixtures__1.TestResolverDTO, opts) {
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
    it('should create a CreateResolver for the DTO', () => expectResolverSDL());
    it('should use the dtoName if provided', () => expectResolverSDL({ dtoName: 'Test' }));
    it('should use the one.name option for the createOne if provided', () => expectResolverSDL({ one: { name: 'create_one_test' } }));
    it('should use the many.name option for the createMany if provided', () => expectResolverSDL({ many: { name: 'create_many_test' } }));
    it('should use the CreateDTOClass if provided', () => expectResolverSDL({ CreateDTOClass: __fixtures__1.TestResolverInputDTO }));
    it('should not expose create methods if disabled', () => expectResolverSDL({ disabled: true }));
    describe('#createOne', () => {
        it('should use the provided CreateOneInput type', () => {
            let CreateOneInput = class CreateOneInput extends (0, src_1.CreateOneInputType)('createResolverDTO', __fixtures__1.TestResolverInputDTO) {
            };
            CreateOneInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CreateOneInput);
            return expectResolverSDL({ CreateOneInput });
        });
        it('should not expose create one method if disabled', () => expectResolverSDL({ one: { disabled: true } }));
        it('should call the service createOne with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const args = {
                input: {
                    stringField: 'foo',
                },
            };
            const output = {
                id: 'id-1',
                stringField: 'foo',
            };
            (0, ts_mockito_1.when)(mockService.createOne((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
            const result = await resolver.createOne({ input: args });
            return expect(result).toEqual(output);
        });
    });
    describe('#createMany', () => {
        it('should not create a new type if the CreateManyArgs is supplied', () => {
            let CreateManyInput = class CreateManyInput extends (0, src_1.CreateManyInputType)('testResolvers', __fixtures__1.TestResolverInputDTO) {
            };
            CreateManyInput = (0, tslib_1.__decorate)([
                (0, graphql_1.InputType)()
            ], CreateManyInput);
            return expectResolverSDL({ CreateManyInput });
        });
        it('should not expose create many method if disabled', () => expectResolverSDL({ many: { disabled: true } }));
        it('should call the service createMany with the provided input', async () => {
            const { resolver, mockService } = await createTestResolver();
            const args = {
                input: [
                    {
                        stringField: 'foo',
                    },
                ],
            };
            const output = [
                {
                    id: 'id-1',
                    stringField: 'foo',
                },
            ];
            (0, ts_mockito_1.when)(mockService.createMany((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
            const result = await resolver.createMany({ input: args });
            return expect(result).toEqual(output);
        });
    });
    describe('created subscription', () => {
        it('should add subscription types if enableSubscriptions is true', () => expectResolverSDL({ enableSubscriptions: true }));
        it('should not expose subscriptions if enableSubscriptions is false', () => expectResolverSDL({ enableSubscriptions: false }));
        describe('create one events', () => {
            it('should publish events for create one when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.createOne((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.createOne({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ one: { enableSubscriptions: true } });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                const event = { [eventName]: output };
                (0, ts_mockito_1.when)(mockService.createOne((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).thenResolve();
                const result = await resolver.createOne({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(event))).once();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.createOne((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                const result = await resolver.createOne({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and one.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    one: { enableSubscriptions: false },
                });
                const args = {
                    input: {
                        stringField: 'foo',
                    },
                };
                const output = {
                    id: 'id-1',
                    stringField: 'foo',
                };
                (0, ts_mockito_1.when)(mockService.createOne((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                const result = await resolver.createOne({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('create many events', () => {
            it('should publish events for create many when enableSubscriptions is set to true for all', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: true });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                const events = output.map((o) => ({ [eventName]: o }));
                (0, ts_mockito_1.when)(mockService.createMany((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                events.forEach((e) => (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(e))).thenResolve());
                const result = await resolver.createMany({ input: args });
                events.forEach((e) => (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(e))).once());
                return expect(result).toEqual(output);
            });
            it('should publish events for create one when enableSubscriptions is set to true for createOne', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ many: { enableSubscriptions: true } });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                const events = output.map((o) => ({ [eventName]: o }));
                (0, ts_mockito_1.when)(mockService.createMany((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                events.forEach((e) => (0, ts_mockito_1.when)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(e))).thenResolve());
                const result = await resolver.createMany({ input: args });
                events.forEach((e) => (0, ts_mockito_1.verify)(mockPubSub.publish(eventName, (0, ts_mockito_1.deepEqual)(e))).once());
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({ enableSubscriptions: false });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.createMany((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                const result = await resolver.createMany({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
            it('should not publish an event if enableSubscriptions is true and many.enableSubscriptions is false', async () => {
                const { resolver, mockService, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                    many: { enableSubscriptions: false },
                });
                const args = {
                    input: [
                        {
                            stringField: 'foo',
                        },
                    ],
                };
                const output = [
                    {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                ];
                (0, ts_mockito_1.when)(mockService.createMany((0, ts_mockito_1.objectContaining)(args.input))).thenResolve(output);
                const result = await resolver.createMany({ input: args });
                (0, ts_mockito_1.verify)(mockPubSub.publish((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                return expect(result).toEqual(output);
            });
        });
        describe('createSubscription', () => {
            it('should propagate events if enableSubscriptions is true', async () => {
                const { resolver, mockPubSub } = await createTestResolver({
                    enableSubscriptions: true,
                });
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                const event = {
                    [eventName]: {
                        id: 'id-1',
                        stringField: 'foo',
                    },
                };
                const mockIterator = (0, ts_mockito_1.mock)();
                (0, ts_mockito_1.when)(mockPubSub.asyncIterator(eventName)).thenReturn((0, ts_mockito_1.instance)(mockIterator));
                (0, ts_mockito_1.when)(mockIterator.next()).thenResolve({ done: false, value: event });
                const result = await resolver.createdSubscription().next();
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
                const eventName = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, __fixtures__1.TestResolverDTO);
                return expect(() => resolver.createdSubscription()).toThrow(`Unable to subscribe to ${eventName}`);
            });
        });
    });
});
//# sourceMappingURL=create.resolver.spec.js.map