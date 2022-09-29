"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblerFactory = void 0;
const assembler_1 = require("./assembler");
const default_assembler_1 = require("./default.assembler");
/**
 * Assembler Service used by query services to look up Assemblers.
 */
class AssemblerFactory {
    static getAssembler(DTOClass, EntityClass) {
        const AssemblerClasses = (0, assembler_1.getAssemblers)(DTOClass);
        if (AssemblerClasses) {
            const AssemblerClass = AssemblerClasses.get(EntityClass);
            if (AssemblerClass) {
                return new AssemblerClass();
            }
            const keys = [...AssemblerClasses.keys()];
            const keysWithParent = keys.filter((k) => k.prototype instanceof EntityClass);
            if (keysWithParent.length === 1) {
                return this.getAssembler(DTOClass, keysWithParent[0]);
            }
        }
        const defaultAssembler = new default_assembler_1.DefaultAssembler(DTOClass, EntityClass);
        // if its a default just assume the types can be converted for all types
        return defaultAssembler;
    }
}
exports.AssemblerFactory = AssemblerFactory;
//# sourceMappingURL=assembler.factory.js.map