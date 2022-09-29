"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const graphql_1 = require("@nestjs/graphql");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
        return ctx.getContext().req;
    }
};
JwtAuthGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.guard.js.map