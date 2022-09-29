"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHookToken = void 0;
const getHookToken = (hookType, DTOClass) => `${DTOClass.name}${hookType}Hook`;
exports.getHookToken = getHookToken;
//# sourceMappingURL=tokens.js.map