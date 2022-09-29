"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomAuthorizerToken = exports.getAuthorizerToken = void 0;
const getAuthorizerToken = (DTOClass) => `${DTOClass.name}Authorizer`;
exports.getAuthorizerToken = getAuthorizerToken;
const getCustomAuthorizerToken = (DTOClass) => `${DTOClass.name}CustomAuthorizer`;
exports.getCustomAuthorizerToken = getCustomAuthorizerToken;
//# sourceMappingURL=tokens.js.map