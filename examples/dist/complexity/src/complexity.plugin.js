"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexityPlugin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const graphql_query_complexity_1 = require("graphql-query-complexity");
const common_1 = require("@nestjs/common");
let ComplexityPlugin = class ComplexityPlugin {
    constructor(gqlSchemaHost) {
        this.gqlSchemaHost = gqlSchemaHost;
        this.maxComplexity = 30;
        this.logger = new common_1.Logger('complexity-plugin');
    }
    requestDidStart() {
        const { schema } = this.gqlSchemaHost;
        return Promise.resolve({
            didResolveOperation: ({ request, document }) => {
                const complexity = (0, graphql_query_complexity_1.getComplexity)({
                    schema,
                    operationName: request.operationName,
                    query: document,
                    variables: request.variables,
                    estimators: [(0, graphql_query_complexity_1.fieldExtensionsEstimator)(), (0, graphql_query_complexity_1.simpleEstimator)({ defaultComplexity: 1 })],
                });
                if (complexity >= this.maxComplexity) {
                    return Promise.reject(new graphql_2.GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: ${this.maxComplexity}`));
                }
                this.logger.log(`Query Complexity: ${complexity}`);
                return Promise.resolve();
            },
        });
    }
};
ComplexityPlugin = (0, tslib_1.__decorate)([
    (0, graphql_1.Plugin)(),
    (0, tslib_1.__metadata)("design:paramtypes", [graphql_1.GraphQLSchemaHost])
], ComplexityPlugin);
exports.ComplexityPlugin = ComplexityPlugin;
//# sourceMappingURL=complexity.plugin.js.map