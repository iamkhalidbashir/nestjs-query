"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAuthorizer = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../auth");
const InjectAuthorizer = (DTOClass) => (0, common_1.Inject)((0, auth_1.getAuthorizerToken)(DTOClass));
exports.InjectAuthorizer = InjectAuthorizer;
//# sourceMappingURL=inject-authorizer.decorator.js.map