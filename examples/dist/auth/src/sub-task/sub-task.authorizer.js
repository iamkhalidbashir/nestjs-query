"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTaskAuthorizer = void 0;
class SubTaskAuthorizer {
    authorize(context, authorizationContext) {
        if (context.req.user.username === 'nestjs-query-3' && (authorizationContext === null || authorizationContext === void 0 ? void 0 : authorizationContext.readonly)) {
            return Promise.resolve({});
        }
        return Promise.resolve({ ownerId: { eq: context.req.user.id } });
    }
    authorizeRelation(relationName, context) {
        if (relationName === 'todoItem') {
            return Promise.resolve({ ownerId: { eq: context.req.user.id } });
        }
        return Promise.resolve({});
    }
}
exports.SubTaskAuthorizer = SubTaskAuthorizer;
//# sourceMappingURL=sub-task.authorizer.js.map