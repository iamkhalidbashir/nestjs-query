"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPager = void 0;
const EMPTY_PAGING_RESULTS = () => ({
    nodes: [],
    pageInfo: { hasNextPage: false, hasPreviousPage: false },
    totalCount: () => Promise.resolve(0),
});
const DEFAULT_PAGING_META = (query) => ({
    opts: { offset: 0, limit: 0 },
    query,
});
class OffsetPager {
    async page(queryMany, query, count) {
        const pagingMeta = this.getPageMeta(query);
        if (!this.isValidPaging(pagingMeta)) {
            return EMPTY_PAGING_RESULTS();
        }
        const results = await this.runQuery(queryMany, query, pagingMeta);
        return this.createPagingResult(results, pagingMeta, () => { var _a; return count((_a = query.filter) !== null && _a !== void 0 ? _a : {}); });
    }
    isValidPaging(pagingMeta) {
        return pagingMeta.opts.limit > 0;
    }
    async runQuery(queryMany, query, pagingMeta) {
        const windowedQuery = this.createQuery(query, pagingMeta);
        const nodes = await queryMany(windowedQuery);
        const returnNodes = this.checkForExtraNode(nodes, pagingMeta.opts);
        const hasExtraNode = returnNodes.length !== nodes.length;
        return { nodes: returnNodes, hasExtraNode };
    }
    getPageMeta(query) {
        var _a;
        const { limit = 0, offset = 0 } = (_a = query.paging) !== null && _a !== void 0 ? _a : {};
        if (!limit) {
            return DEFAULT_PAGING_META(query);
        }
        return { opts: { limit, offset }, query };
    }
    createPagingResult(results, pagingMeta, totalCount) {
        const { nodes, hasExtraNode } = results;
        const pageInfo = {
            hasNextPage: hasExtraNode,
            // we have a previous page if we are going backwards and have an extra node.
            hasPreviousPage: pagingMeta.opts.offset > 0,
        };
        return { nodes, pageInfo, totalCount };
    }
    createQuery(query, pagingMeta) {
        const { limit, offset } = pagingMeta.opts;
        return { ...query, paging: { limit: limit + 1, offset } };
    }
    checkForExtraNode(nodes, opts) {
        const returnNodes = [...nodes];
        const hasExtraNode = nodes.length > opts.limit;
        if (hasExtraNode) {
            returnNodes.pop();
        }
        return returnNodes;
    }
}
exports.OffsetPager = OffsetPager;
//# sourceMappingURL=pager.js.map