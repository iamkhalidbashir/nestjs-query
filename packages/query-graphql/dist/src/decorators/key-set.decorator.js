"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeySet = exports.KeySet = void 0;
const core_1 = require("@nestjs-query/core");
const constants_1 = require("./constants");
const reflector = new core_1.ValueReflector(constants_1.KEY_SET_KEY);
function KeySet(keys) {
    return (DTOClass) => reflector.set(DTOClass, keys);
}
exports.KeySet = KeySet;
const getKeySet = (DTOClass) => reflector.get(DTOClass, true);
exports.getKeySet = getKeySet;
//# sourceMappingURL=key-set.decorator.js.map