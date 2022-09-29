"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectCustomAuthorizer = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../auth");
const InjectCustomAuthorizer = (DTOClass) => (0, common_1.Inject)((0, auth_1.getCustomAuthorizerToken)(DTOClass));
exports.InjectCustomAuthorizer = InjectCustomAuthorizer;
//# sourceMappingURL=inject-custom-authorizer.decorator.js.map