"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVirtualTypeWithReferenceOptions = exports.isVirtualReferenceOptions = exports.isEmbeddedSchemaTypeOptions = exports.isSchemaTypeWithReferenceOptions = exports.isReferenceOptions = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isReferenceOptions(options) {
    return (typeof options === 'object' &&
        options !== null &&
        'type' in options &&
        'ref' in options &&
        typeof options.ref === 'string');
}
exports.isReferenceOptions = isReferenceOptions;
function isSchemaTypeWithReferenceOptions(type) {
    if (type && typeof type === 'object' && 'options' in type) {
        const { options } = type;
        return isReferenceOptions(options);
    }
    return false;
}
exports.isSchemaTypeWithReferenceOptions = isSchemaTypeWithReferenceOptions;
function isEmbeddedSchemaTypeOptions(options) {
    if (options && typeof options === 'object' && '$embeddedSchemaType' in options) {
        const { $embeddedSchemaType } = options;
        return isReferenceOptions($embeddedSchemaType.options);
    }
    return false;
}
exports.isEmbeddedSchemaTypeOptions = isEmbeddedSchemaTypeOptions;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isVirtualReferenceOptions(options) {
    return (typeof options === 'object' &&
        options !== null &&
        'ref' in options &&
        'localField' in options &&
        'foreignField' in options);
}
exports.isVirtualReferenceOptions = isVirtualReferenceOptions;
function isVirtualTypeWithReferenceOptions(virtualType) {
    if (virtualType && typeof virtualType === 'object' && 'options' in virtualType) {
        const { options } = virtualType;
        return isVirtualReferenceOptions(options);
    }
    return false;
}
exports.isVirtualTypeWithReferenceOptions = isVirtualTypeWithReferenceOptions;
//# sourceMappingURL=mongoose-types.helper.js.map