"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAssembler = void 0;
const class_transformer_assembler_1 = require("./class-transformer.assembler");
/**
 * DefaultAssembler used when an Assembler was not defined.
 */
class DefaultAssembler extends class_transformer_assembler_1.ClassTransformerAssembler {
    constructor(DTOClass, EntityClass) {
        super(DTOClass, EntityClass);
    }
}
exports.DefaultAssembler = DefaultAssembler;
//# sourceMappingURL=default.assembler.js.map