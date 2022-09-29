"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const auth_constants_1 = require("./auth.constants");
const auth_resolver_1 = require("./auth.resolver");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: auth_constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [auth_service_1.AuthService, auth_resolver_1.AuthResolver, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map