"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reference = exports.getReferences = void 0;
const core_1 = require("@nestjs-query/core");
const constants_1 = require("./constants");
const common_1 = require("../common");
const reflector = new core_1.ArrayReflector(constants_1.REFERENCE_KEY);
function getReferenceDescriptors(DTOClass) {
    return (0, core_1.getPrototypeChain)(DTOClass).reduce((references, cls) => {
        var _a;
        const referenceNames = references.map((r) => r.name);
        const metaReferences = (_a = reflector.get(cls)) !== null && _a !== void 0 ? _a : [];
        const inheritedReferences = metaReferences.filter((t) => !referenceNames.includes(t.name));
        return [...inheritedReferences, ...references];
    }, []);
}
function convertReferencesToOpts(references, baseOpts) {
    return references.reduce((referenceOpts, r) => {
        const opts = (0, common_1.mergeBaseResolverOpts)({ ...r.relationOpts, DTO: r.relationTypeFunc(), keys: r.keys }, baseOpts !== null && baseOpts !== void 0 ? baseOpts : {});
        return { ...referenceOpts, [r.name]: opts };
    }, {});
}
function getReferences(DTOClass, opts) {
    const referenceDescriptors = getReferenceDescriptors(DTOClass);
    return convertReferencesToOpts(referenceDescriptors, opts);
}
exports.getReferences = getReferences;
function Reference(name, relationTypeFunc, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
keys, relationOpts) {
    return (DTOClass) => {
        reflector.append(DTOClass, { name, keys, relationOpts, relationTypeFunc });
        return DTOClass;
    };
}
exports.Reference = Reference;
//# sourceMappingURL=reference.decorator.js.map