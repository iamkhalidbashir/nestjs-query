"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAuthorizer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const decorators_1 = require("../decorators");
const tokens_1 = require("./tokens");
const createRelationAuthorizer = (opts) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async authorize(context, authorizationContext) {
        var _a;
        return (_a = opts.authorize(context, authorizationContext)) !== null && _a !== void 0 ? _a : {};
    },
    authorizeRelation() {
        return Promise.reject(new Error('Not implemented'));
    },
});
function createDefaultAuthorizer(DTOClass, opts) {
    let DefaultAuthorizer = class DefaultAuthorizer {
        constructor(moduleRef, customAuthorizer) {
            this.moduleRef = moduleRef;
            this.customAuthorizer = customAuthorizer;
            this.authOptions = opts;
            this.relationsAuthorizers = new Map();
            this.relations = this.getRelations();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async authorize(context, authorizationContext) {
            var _a, _b, _c, _d;
            return ((_d = (_b = (_a = this.customAuthorizer) === null || _a === void 0 ? void 0 : _a.authorize(context, authorizationContext)) !== null && _b !== void 0 ? _b : (_c = this.authOptions) === null || _c === void 0 ? void 0 : _c.authorize(context, authorizationContext)) !== null && _d !== void 0 ? _d : {});
        }
        async authorizeRelation(relationName, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context, authorizationContext) {
            var _a, _b;
            if (this.customAuthorizer && typeof this.customAuthorizer.authorizeRelation === 'function') {
                const filterFromCustomAuthorizer = await this.customAuthorizer.authorizeRelation(relationName, context, authorizationContext);
                if (filterFromCustomAuthorizer)
                    return filterFromCustomAuthorizer;
            }
            this.addRelationAuthorizerIfNotExist(relationName);
            return (_b = (_a = this.relationsAuthorizers.get(relationName)) === null || _a === void 0 ? void 0 : _a.authorize(context, authorizationContext)) !== null && _b !== void 0 ? _b : {};
        }
        addRelationAuthorizerIfNotExist(relationName) {
            if (!this.relationsAuthorizers.has(relationName)) {
                const relation = this.relations.get(relationName);
                if (!relation)
                    return;
                if (relation.auth) {
                    this.relationsAuthorizers.set(relationName, createRelationAuthorizer(relation.auth));
                }
                else if ((0, decorators_1.getAuthorizer)(relation.DTO)) {
                    this.relationsAuthorizers.set(relationName, this.moduleRef.get((0, tokens_1.getAuthorizerToken)(relation.DTO), { strict: false }));
                }
            }
        }
        getRelations() {
            const { many = {}, one = {} } = (0, decorators_1.getRelations)(DTOClass);
            const relationsMap = new Map();
            Object.keys(many).forEach((relation) => relationsMap.set(relation, many[relation]));
            Object.keys(one).forEach((relation) => relationsMap.set(relation, one[relation]));
            return relationsMap;
        }
    };
    DefaultAuthorizer = (0, tslib_1.__decorate)([
        (0, common_1.Injectable)(),
        (0, tslib_1.__param)(1, (0, common_1.Optional)()),
        (0, tslib_1.__param)(1, (0, common_1.Inject)((0, tokens_1.getCustomAuthorizerToken)(DTOClass))),
        (0, tslib_1.__metadata)("design:paramtypes", [core_1.ModuleRef, Object])
    ], DefaultAuthorizer);
    return DefaultAuthorizer;
}
exports.createDefaultAuthorizer = createDefaultAuthorizer;
//# sourceMappingURL=default-crud.authorizer.js.map