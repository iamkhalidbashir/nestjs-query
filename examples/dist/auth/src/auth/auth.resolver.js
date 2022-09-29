"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_response_dto_1 = require("./dto/login-response.dto");
const login_input_dto_1 = require("./dto/login-input.dto");
const user_dto_1 = require("../user/user.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const current_user_decorator_1 = require("./current-user.decorator");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async login(input) {
        const user = await this.authService.validateUser(input.username, input.password);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.authService.login(user);
    }
    me(user) {
        return this.authService.currentUser(user);
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => login_response_dto_1.LoginResponseDto),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)('input')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [login_input_dto_1.LoginInputDTO]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => user_dto_1.UserDTO),
    (0, tslib_1.__param)(0, (0, current_user_decorator_1.CurrentUser)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
AuthResolver = (0, tslib_1.__decorate)([
    (0, graphql_1.Resolver)(),
    (0, tslib_1.__metadata)("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map