"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssemblerQueryServiceToken = exports.getQueryServiceToken = void 0;
function getQueryServiceToken(DTOClass) {
    return `${DTOClass.name}QueryService`;
}
exports.getQueryServiceToken = getQueryServiceToken;
function getAssemblerQueryServiceToken(AssemblerClass) {
    return `${AssemblerClass.name}QueryService`;
}
exports.getAssemblerQueryServiceToken = getAssemblerQueryServiceToken;
//# sourceMappingURL=helpers.js.map