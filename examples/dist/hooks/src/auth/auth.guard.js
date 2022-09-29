"use strict";
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("./constants");
const config_1 = require("../config");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor() {
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    canActivate(context) {
        const { headers } = graphql_1.GqlExecutionContext.create(context).getContext().request;
        this.logger.log(`Req = ${JSON.stringify(headers)}`);
        return headers[constants_1.AUTH_HEADER_NAME] === config_1.config.auth.header;
    }
};
AuthGuard = AuthGuard_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map