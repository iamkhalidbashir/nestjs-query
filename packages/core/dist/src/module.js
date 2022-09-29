"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryCoreModule = void 0;
const providers_1 = require("./providers");
class NestjsQueryCoreModule {
    static forFeature(opts) {
        const { imports = [], assemblers = [] } = opts;
        const assemblerServiceProviders = (0, providers_1.createServices)(assemblers);
        return {
            module: NestjsQueryCoreModule,
            imports: [...imports],
            providers: [...assemblers, ...assemblerServiceProviders],
            exports: [...imports, ...assemblers, ...assemblerServiceProviders],
        };
    }
}
exports.NestjsQueryCoreModule = NestjsQueryCoreModule;
//# sourceMappingURL=module.js.map