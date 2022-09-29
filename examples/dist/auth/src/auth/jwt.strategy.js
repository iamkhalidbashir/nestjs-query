"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const tslib_1 = require("tslib");
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("./auth.constants");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: auth_constants_1.jwtConstants.secret,
        });
    }
    validate(payload) {
        return Promise.resolve({ id: payload.sub, username: payload.username });
    }
};
JwtStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map