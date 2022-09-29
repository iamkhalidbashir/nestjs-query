"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateCursorConnectionType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@nestjs-query/core");
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../decorators");
const query_1 = require("../../query");
const pager_1 = require("./pager");
const edge_type_1 = require("./edge.type");
const page_info_type_1 = require("./page-info.type");
const common_2 = require("../../../common");
const DEFAULT_COUNT = () => Promise.reject(new common_1.NotImplementedException('totalCount not implemented'));
const reflector = new core_1.MapReflector('nestjs-query:cursor-connection-type');
function getOrCreateConnectionName(DTOClass, opts) {
    const { connectionName } = opts;
    if (connectionName) {
        return connectionName;
    }
    const objName = (0, common_2.getGraphqlObjectName)(DTOClass, 'Unable to make ConnectionType.');
    return `${objName}Connection`;
}
function getOrCreateCursorConnectionType(TItemClass, maybeOpts) {
    const opts = maybeOpts !== null && maybeOpts !== void 0 ? maybeOpts : { pagingStrategy: query_1.PagingStrategies.CURSOR };
    const connectionName = getOrCreateConnectionName(TItemClass, opts);
    return reflector.memoize(TItemClass, connectionName, () => {
        var AbstractConnection_1;
        const pager = (0, pager_1.createPager)(TItemClass, opts);
        const E = (0, edge_type_1.getOrCreateEdgeType)(TItemClass);
        const PIT = (0, page_info_type_1.getOrCreatePageInfoType)();
        let AbstractConnection = AbstractConnection_1 = class AbstractConnection {
            constructor(pageInfo, edges, totalCountFn) {
                this.pageInfo = pageInfo !== null && pageInfo !== void 0 ? pageInfo : { hasNextPage: false, hasPreviousPage: false };
                this.edges = edges !== null && edges !== void 0 ? edges : [];
                this.totalCountFn = totalCountFn !== null && totalCountFn !== void 0 ? totalCountFn : DEFAULT_COUNT;
            }
            static get resolveType() {
                return this;
            }
            static async createFromPromise(queryMany, query, count) {
                const { pageInfo, edges, totalCount } = await pager.page(queryMany, query, count !== null && count !== void 0 ? count : DEFAULT_COUNT);
                return new AbstractConnection_1(
                // create the appropriate graphql instance
                new PIT(pageInfo.hasNextPage, pageInfo.hasPreviousPage, pageInfo.startCursor, pageInfo.endCursor), edges.map(({ node, cursor }) => new E(node, cursor)), totalCount);
            }
            get totalCount() {
                return this.totalCountFn();
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => PIT, { description: 'Paging information' }),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AbstractConnection.prototype, "pageInfo", void 0);
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => [E], { description: 'Array of edges.' }),
            (0, tslib_1.__metadata)("design:type", Array)
        ], AbstractConnection.prototype, "edges", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.SkipIf)(() => !opts.enableTotalCount, (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Fetch total count of records' })),
            (0, tslib_1.__metadata)("design:type", Promise),
            (0, tslib_1.__metadata)("design:paramtypes", [])
        ], AbstractConnection.prototype, "totalCount", null);
        AbstractConnection = AbstractConnection_1 = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(connectionName),
            (0, tslib_1.__metadata)("design:paramtypes", [Object, Array, Function])
        ], AbstractConnection);
        return AbstractConnection;
    });
}
exports.getOrCreateCursorConnectionType = getOrCreateCursorConnectionType;
//# sourceMappingURL=cursor-connection.type.js.map