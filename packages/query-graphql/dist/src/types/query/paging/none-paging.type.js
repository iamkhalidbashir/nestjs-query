"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateNonePagingType = void 0;
const constants_1 = require("./constants");
let graphQLPaging = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const getOrCreateNonePagingType = () => {
    if (graphQLPaging) {
        return graphQLPaging;
    }
    class GraphQLPagingImpl {
    }
    GraphQLPagingImpl.strategy = constants_1.PagingStrategies.NONE;
    graphQLPaging = GraphQLPagingImpl;
    return graphQLPaging;
};
exports.getOrCreateNonePagingType = getOrCreateNonePagingType;
//# sourceMappingURL=none-paging.type.js.map