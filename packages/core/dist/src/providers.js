"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServices = void 0;
const assemblers_1 = require("./assemblers");
const decorators_1 = require("./decorators");
const helpers_1 = require("./decorators/helpers");
const services_1 = require("./services");
function createServiceProvider(AssemblerClass) {
    const classes = (0, assemblers_1.getAssemblerClasses)(AssemblerClass);
    if (!classes) {
        throw new Error(`unable to determine DTO and Entity classes for ${AssemblerClass.name}. Did you decorate your class with @Assembler`);
    }
    const { EntityClass } = classes;
    return {
        provide: (0, helpers_1.getAssemblerQueryServiceToken)(AssemblerClass),
        useFactory(assembler, entityService) {
            return new services_1.AssemblerQueryService(assembler, entityService);
        },
        inject: [AssemblerClass, (0, decorators_1.getQueryServiceToken)(EntityClass)],
    };
}
const createServices = (opts) => opts.map((opt) => createServiceProvider(opt));
exports.createServices = createServices;
//# sourceMappingURL=providers.js.map