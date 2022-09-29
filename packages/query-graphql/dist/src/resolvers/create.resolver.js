"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResolver = exports.Creatable = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const lodash_omit_1 = (0, tslib_1.__importDefault)(require("lodash.omit"));
const hooks_1 = require("../hooks");
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const interceptors_1 = require("../interceptors");
const subscription_1 = require("../subscription");
const types_1 = require("../types");
const helpers_1 = require("./helpers");
const resolver_interface_1 = require("./resolver.interface");
const auth_1 = require("../auth");
/** @internal */
const defaultCreateDTO = (dtoNames, DTOClass) => {
    let PartialInput = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class PartialInput extends (0, graphql_1.PartialType)(DTOClass, graphql_1.InputType) {
    };
    PartialInput = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Create${dtoNames.baseName}`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], PartialInput);
    return PartialInput;
};
/** @internal */
const defaultCreateOneInput = (dtoNames, InputDTO) => {
    const { baseName, baseNameLower } = dtoNames;
    let CO = class CO extends (0, types_1.CreateOneInputType)(baseNameLower, InputDTO) {
    };
    CO = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`CreateOne${baseName}Input`)
    ], CO);
    return CO;
};
/** @internal */
const defaultCreateManyInput = (dtoNames, InputDTO) => {
    const { pluralBaseName, pluralBaseNameLower } = dtoNames;
    let CM = class CM extends (0, types_1.CreateManyInputType)(pluralBaseNameLower, InputDTO) {
    };
    CM = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`CreateMany${pluralBaseName}Input`)
    ], CM);
    return CM;
};
/**
 * @internal
 * Mixin to add `create` graphql endpoints.
 */
const Creatable = (DTOClass, opts) => (BaseClass) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const dtoNames = (0, common_1.getDTONames)(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = (_b = (_a = opts.one) === null || _a === void 0 ? void 0 : _a.enableSubscriptions) !== null && _b !== void 0 ? _b : enableSubscriptions;
    const enableManySubscriptions = (_d = (_c = opts.many) === null || _c === void 0 ? void 0 : _c.enableSubscriptions) !== null && _d !== void 0 ? _d : enableSubscriptions;
    const createdEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, DTOClass);
    const { CreateDTOClass = defaultCreateDTO(dtoNames, DTOClass), CreateOneInput = defaultCreateOneInput(dtoNames, CreateDTOClass), CreateManyInput = defaultCreateManyInput(dtoNames, CreateDTOClass), } = opts;
    const createOneMutationName = (_f = (_e = opts.one) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : `createOne${baseName}`;
    const createManyMutationName = (_h = (_g = opts.many) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : `createMany${pluralBaseName}`;
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'CreateDTOClass', 'CreateOneInput', 'CreateManyInput');
    let CO = class CO extends (0, types_1.MutationArgsType)(CreateOneInput) {
    };
    CO = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], CO);
    let CM = class CM extends (0, types_1.MutationArgsType)(CreateManyInput) {
    };
    CM = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], CM);
    let SI = class SI extends (0, types_1.SubscriptionFilterInputType)(DTOClass) {
    };
    SI = (0, tslib_1.__decorate)([
        (0, graphql_1.InputType)(`Create${baseName}SubscriptionFilterInput`)
    ], SI);
    let SA = class SA extends (0, types_1.SubscriptionArgsType)(SI) {
    };
    SA = (0, tslib_1.__decorate)([
        (0, graphql_1.ArgsType)()
    ], SA);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionFilter = (0, helpers_1.createSubscriptionFilter)(SI, createdEvent);
    let CreateResolverBase = class CreateResolverBase extends BaseClass {
        async createOne(input, authorizeFilter) {
            // Ignore `authorizeFilter` for now but give users the ability to throw an UnauthorizedException
            const created = await this.service.createOne(input.input.input);
            if (enableOneSubscriptions) {
                await this.publishCreatedEvent(created, authorizeFilter);
            }
            return created;
        }
        async createMany(input, authorizeFilter) {
            // Ignore `authorizeFilter` for now but give users the ability to throw an UnauthorizedException
            const created = await this.service.createMany(input.input.input);
            if (enableManySubscriptions) {
                await Promise.all(created.map((c) => this.publishCreatedEvent(c, authorizeFilter)));
            }
            return created;
        }
        async publishCreatedEvent(dto, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(createdEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [createdEvent]: dto });
            }
        }
        createdSubscription(input, authorizeFilter) {
            if (!this.pubSub || !(enableManySubscriptions || enableOneSubscriptions)) {
                throw new Error(`Unable to subscribe to ${createdEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(createdEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
    };
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => DTOClass, { name: createOneMutationName }, commonResolverOpts, {
            interceptors: [
                (0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_CREATE_ONE, CreateDTOClass, DTOClass),
                (0, interceptors_1.AuthorizerInterceptor)(DTOClass),
            ],
        }, (_j = opts.one) !== null && _j !== void 0 ? _j : {}),
        (0, tslib_1.__param)(0, (0, decorators_1.MutationHookArgs)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.CREATE,
            many: false,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [CO, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], CreateResolverBase.prototype, "createOne", null);
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverMutation)(() => [DTOClass], { name: createManyMutationName }, { ...commonResolverOpts }, {
            interceptors: [
                (0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_CREATE_MANY, CreateDTOClass, DTOClass),
                (0, interceptors_1.AuthorizerInterceptor)(DTOClass),
            ],
        }, (_k = opts.many) !== null && _k !== void 0 ? _k : {}),
        (0, tslib_1.__param)(0, (0, decorators_1.MutationHookArgs)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.CREATE,
            many: true,
        })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [CM, Object]),
        (0, tslib_1.__metadata)("design:returntype", Promise)
    ], CreateResolverBase.prototype, "createMany", null);
    (0, tslib_1.__decorate)([
        (0, decorators_1.ResolverSubscription)(() => DTOClass, { name: createdEvent, filter: subscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions || enableManySubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)],
        }),
        (0, tslib_1.__param)(0, (0, graphql_1.Args)()),
        (0, tslib_1.__param)(1, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.CREATE, many: false })),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [SA, Object]),
        (0, tslib_1.__metadata)("design:returntype", Object)
    ], CreateResolverBase.prototype, "createdSubscription", null);
    CreateResolverBase = (0, tslib_1.__decorate)([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], CreateResolverBase);
    return CreateResolverBase;
};
exports.Creatable = Creatable;
/**
 * Factory to create a new abstract class that can be extended to add `create` endpoints.
 *
 * Assume we have `TodoItemDTO`, you can create a resolver with `createOneTodoItem` and `createManyTodoItems` graphql
 * query endpoints using the following code.
 *
 * ```ts
 * @Resolver()
 * export class TodoItemResolver extends CreateResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *    super(service);
 *   }
 * }
 * ```
 *
 * @param DTOClass - The DTO class that should be returned from the `createOne` and `createMany` endpoint.
 * @param opts - Options to customize endpoints.
 * @typeparam DTO - The type of DTO that should be created.
 * @typeparam C - The create DTO type.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const CreateResolver = (DTOClass, opts = {}) => (0, exports.Creatable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.CreateResolver = CreateResolver;
//# sourceMappingURL=create.resolver.js.map