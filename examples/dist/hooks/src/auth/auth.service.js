"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    getUserEmail(userName) {
        return Promise.resolve(`${userName}@nestjs-query.com`);
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map