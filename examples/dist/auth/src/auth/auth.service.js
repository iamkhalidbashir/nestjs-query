"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs-query/core");
const user_entity_1 = require("../user/user.entity");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(username, pass) {
        const [user] = await this.usersService.query({ filter: { username: { eq: username } }, paging: { limit: 1 } });
        // dont use plain text passwords in production!
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async currentUser(authUser) {
        try {
            const user = await this.usersService.getById(authUser.id);
            return user;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    login(user) {
        const payload = { username: user.username, sub: user.id };
        return Promise.resolve({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            accessToken: this.jwtService.sign(payload),
        });
    }
};
AuthService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, core_1.InjectQueryService)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map