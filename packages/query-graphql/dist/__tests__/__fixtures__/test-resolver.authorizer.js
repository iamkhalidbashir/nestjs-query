"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResolverAuthorizer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let TestResolverAuthorizer = class TestResolverAuthorizer {
    authorize() {
        return Promise.reject(new Error('authorize Not Implemented'));
    }
    authorizeRelation() {
        return Promise.reject(new Error('authorizeRelation Not Implemented'));
    }
};
TestResolverAuthorizer = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], TestResolverAuthorizer);
exports.TestResolverAuthorizer = TestResolverAuthorizer;
//# sourceMappingURL=test-resolver.authorizer.js.map