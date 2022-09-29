"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateOffsetConnectionType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@nestjs-query/core");
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../decorators");
const common_2 = require("../../../common");
const pager_1 = require("./pager");
const offset_page_info_type_1 = require("./offset-page-info.type");
const DEFAULT_COUNT = () => Promise.reject(new common_1.NotImplementedException('totalCount not implemented'));
const reflector = new core_1.MapReflector('nestjs-query:offset-connection-type');
function getOrCreateConnectionName(DTOClass, opts) {
    const { connectionName } = opts;
    if (connectionName) {
        return connectionName;
    }
    const objName = (0, common_2.getGraphqlObjectName)(DTOClass, 'Unable to make OffsetConnectionType.');
    return `${objName}OffsetConnection`;
}
function getOrCreateOffsetConnectionType(TItemClass, opts) {
    const connectionName = getOrCreateConnectionName(TItemClass, opts);
    return reflector.memoize(TItemClass, connectionName, () => {
        var AbstractConnection_1;
        const pager = (0, pager_1.createPager)();
        const PIT = (0, offset_page_info_type_1.getOrCreateOffsetPageInfoType)();
        let AbstractConnection = AbstractConnection_1 = class AbstractConnection {
            constructor(pageInfo, nodes, totalCountFn) {
                this.pageInfo = pageInfo !== null && pageInfo !== void 0 ? pageInfo : { hasNextPage: false, hasPreviousPage: false };
                this.nodes = nodes !== null && nodes !== void 0 ? nodes : [];
                this.totalCountFn = totalCountFn !== null && totalCountFn !== void 0 ? totalCountFn : DEFAULT_COUNT;
            }
            static get resolveType() {
                return this;
            }
            static async createFromPromise(queryMany, query, count) {
                const { pageInfo, nodes, totalCount } = await pager.page(queryMany, query, count !== null && count !== void 0 ? count : DEFAULT_COUNT);
                return new AbstractConnection_1(
                // create the appropriate graphql instance
                new PIT(pageInfo.hasNextPage, pageInfo.hasPreviousPage), nodes, totalCount);
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
            (0, graphql_1.Field)(() => [TItemClass], { description: 'Array of nodes.' }),
            (0, tslib_1.__metadata)("design:type", Array)
        ], AbstractConnection.prototype, "nodes", void 0);
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
exports.getOrCreateOffsetConnectionType = getOrCreateOffsetConnectionType;
//# sourceMappingURL=offset-connection.type.js.map