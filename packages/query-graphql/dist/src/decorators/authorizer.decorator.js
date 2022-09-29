"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomAuthorizer = exports.getAuthorizer = exports.Authorize = void 0;
const core_1 = require("@nestjs-query/core");
const auth_1 = require("../auth");
const constants_1 = require("./constants");
const reflector = new core_1.ValueReflector(constants_1.AUTHORIZER_KEY);
const customAuthorizerReflector = new core_1.ValueReflector(constants_1.CUSTOM_AUTHORIZER_KEY);
function Authorize(optsOrAuthorizerOrClass) {
    return (DTOClass) => {
        if (!('authorize' in optsOrAuthorizerOrClass)) {
            // If the user provided a class, provide the custom authorizer and create a default authorizer that injects the custom authorizer
            customAuthorizerReflector.set(DTOClass, optsOrAuthorizerOrClass);
            return reflector.set(DTOClass, (0, auth_1.createDefaultAuthorizer)(DTOClass));
        }
        return reflector.set(DTOClass, (0, auth_1.createDefaultAuthorizer)(DTOClass, optsOrAuthorizerOrClass));
    };
}
exports.Authorize = Authorize;
const getAuthorizer = (DTOClass) => reflector.get(DTOClass);
exports.getAuthorizer = getAuthorizer;
const getCustomAuthorizer = (DTOClass) => customAuthorizerReflector.get(DTOClass);
exports.getCustomAuthorizer = getCustomAuthorizer;
//# sourceMappingURL=authorizer.decorator.js.map