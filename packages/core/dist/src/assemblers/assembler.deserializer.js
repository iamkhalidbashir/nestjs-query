"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssemblerDeserializer = exports.AssemblerDeserializer = void 0;
const common_1 = require("../common");
const constants_1 = require("./constants");
const reflector = new common_1.ValueReflector(constants_1.ASSEMBLER_DESERIALIZER_KEY);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function AssemblerDeserializer(deserializer) {
    return (cls) => {
        if (reflector.isDefined(cls)) {
            throw new Error(`Assembler Deserializer already registered for ${cls.name}`);
        }
        reflector.set(cls, deserializer);
        return cls;
    };
}
exports.AssemblerDeserializer = AssemblerDeserializer;
function getAssemblerDeserializer(DTOClass) {
    return reflector.get(DTOClass, true);
}
exports.getAssemblerDeserializer = getAssemblerDeserializer;
//# sourceMappingURL=assembler.deserializer.js.map