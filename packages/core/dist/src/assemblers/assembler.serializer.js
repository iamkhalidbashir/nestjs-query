"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssemblerSerializer = exports.AssemblerSerializer = void 0;
const common_1 = require("../common");
const constants_1 = require("./constants");
const reflector = new common_1.ValueReflector(constants_1.ASSEMBLER_SERIALIZER_KEY);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function AssemblerSerializer(serializer) {
    return (cls) => {
        if (reflector.isDefined(cls)) {
            throw new Error(`Assembler Serializer already registered for ${cls.name}`);
        }
        reflector.set(cls, serializer);
        return cls;
    };
}
exports.AssemblerSerializer = AssemblerSerializer;
function getAssemblerSerializer(DTOClass) {
    return reflector.get(DTOClass, true);
}
exports.getAssemblerSerializer = getAssemblerSerializer;
//# sourceMappingURL=assembler.serializer.js.map