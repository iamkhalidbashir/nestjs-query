"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssemblerClasses = exports.getAssemblers = exports.Assembler = void 0;
const common_1 = require("../common");
const constants_1 = require("./constants");
const assemblerReflector = new common_1.ValueReflector(constants_1.ASSEMBLER_CLASSES_KEY);
const reflector = new common_1.MapReflector(constants_1.ASSEMBLER_KEY);
/**
 * Class decorator for Assemblers to register them with nestjs-query
 * @param DTOClass - the DTO class.
 * @param EntityClass - The entity class.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function Assembler(DTOClass, EntityClass) {
    return (cls) => {
        if (reflector.has(DTOClass, EntityClass)) {
            throw new Error(`Assembler already registered for ${DTOClass.name} ${EntityClass.name}`);
        }
        assemblerReflector.set(cls, { DTOClass, EntityClass });
        reflector.set(DTOClass, EntityClass, cls);
        return cls;
    };
}
exports.Assembler = Assembler;
function getAssemblers(DTOClass) {
    return reflector.get(DTOClass);
}
exports.getAssemblers = getAssemblers;
function getAssemblerClasses(AssemblerClass) {
    return assemblerReflector.get(AssemblerClass);
}
exports.getAssemblerClasses = getAssemblerClasses;
//# sourceMappingURL=assembler.js.map