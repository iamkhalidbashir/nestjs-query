"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
AuthModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map