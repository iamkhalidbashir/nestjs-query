"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryGraphQLModule = void 0;
const core_1 = require("@nestjs-query/core");
const providers_1 = require("./providers");
const subscription_1 = require("./subscription");
class NestjsQueryGraphQLModule {
    static forFeature(opts) {
        const coreModule = this.getCoreModule(opts);
        const providers = this.getProviders(opts);
        return {
            module: NestjsQueryGraphQLModule,
            imports: [...opts.imports, coreModule],
            providers: [...providers],
            exports: [...providers, ...opts.imports, coreModule],
        };
    }
    static defaultPubSubProvider() {
        return { provide: (0, subscription_1.pubSubToken)(), useValue: (0, subscription_1.defaultPubSub)() };
    }
    static getCoreModule(opts) {
        return core_1.NestjsQueryCoreModule.forFeature({
            assemblers: opts.assemblers,
            imports: opts.imports,
        });
    }
    static getProviders(opts) {
        return [
            ...this.getServicesProviders(opts),
            ...this.getPubSubProviders(opts),
            ...this.getAuthorizerProviders(opts),
            ...this.getHookProviders(opts),
            ...this.getResolverProviders(opts),
        ];
    }
    static getPubSubProviders(opts) {
        var _a;
        return [(_a = opts.pubSub) !== null && _a !== void 0 ? _a : this.defaultPubSubProvider()];
    }
    static getServicesProviders(opts) {
        var _a;
        return (_a = opts.services) !== null && _a !== void 0 ? _a : [];
    }
    static getResolverProviders(opts) {
        var _a;
        return (0, providers_1.createResolvers)((_a = opts.resolvers) !== null && _a !== void 0 ? _a : []);
    }
    static getAuthorizerProviders(opts) {
        var _a, _b, _c, _d;
        const resolverDTOs = (_b = (_a = opts.resolvers) === null || _a === void 0 ? void 0 : _a.map((r) => r.DTOClass)) !== null && _b !== void 0 ? _b : [];
        const dtos = (_d = (_c = opts.dtos) === null || _c === void 0 ? void 0 : _c.map((o) => o.DTOClass)) !== null && _d !== void 0 ? _d : [];
        return (0, providers_1.createAuthorizerProviders)([...resolverDTOs, ...dtos]);
    }
    static getHookProviders(opts) {
        var _a, _b;
        return (0, providers_1.createHookProviders)([...((_a = opts.resolvers) !== null && _a !== void 0 ? _a : []), ...((_b = opts.dtos) !== null && _b !== void 0 ? _b : [])]);
    }
}
exports.NestjsQueryGraphQLModule = NestjsQueryGraphQLModule;
//# sourceMappingURL=module.js.map