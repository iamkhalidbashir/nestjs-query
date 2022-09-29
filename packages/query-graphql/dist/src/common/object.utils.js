"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefinedValues = void 0;
const removeUndefinedValues = (obj) => {
    const keys = Object.keys(obj);
    return keys.reduce((cleansed, key) => {
        if (obj[key] === undefined) {
            return cleansed;
        }
        return { ...cleansed, [key]: obj[key] };
    }, {});
};
exports.removeUndefinedValues = removeUndefinedValues;
//# sourceMappingURL=object.utils.js.map