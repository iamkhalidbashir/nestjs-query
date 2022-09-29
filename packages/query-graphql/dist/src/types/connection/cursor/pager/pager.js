"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorPager = void 0;
const EMPTY_PAGING_RESULTS = () => ({
    edges: [],
    pageInfo: { hasNextPage: false, hasPreviousPage: false },
    totalCount: () => Promise.resolve(0),
});
const DEFAULT_PAGING_META = (query) => ({
    opts: { offset: 0, limit: 0, isBackward: false, isForward: true, hasBefore: false },
    query,
});
class CursorPager {
    constructor(strategy) {
        this.strategy = strategy;
    }
    async page(queryMany, query, count) {
        const pagingMeta = this.getPageMeta(query);
        if (!this.isValidPaging(pagingMeta)) {
            return EMPTY_PAGING_RESULTS();
        }
        const results = await this.runQuery(queryMany, query, pagingMeta);
        if (this.isEmptyPage(results, pagingMeta)) {
            return EMPTY_PAGING_RESULTS();
        }
        return this.createPagingResult(results, pagingMeta, () => { var _a; return count((_a = query.filter) !== null && _a !== void 0 ? _a : {}); });
    }
    isValidPaging(pagingMeta) {
        if ('offset' in pagingMeta.opts) {
            return pagingMeta.opts.offset > 0 || pagingMeta.opts.limit > 0;
        }
        return pagingMeta.opts.limit > 0;
    }
    async runQuery(queryMany, query, pagingMeta) {
        const { opts } = pagingMeta;
        const windowedQuery = this.strategy.createQuery(query, opts, true);
        const nodes = await queryMany(windowedQuery);
        const returnNodes = this.strategy.checkForExtraNode(nodes, opts);
        const hasExtraNode = returnNodes.length !== nodes.length;
        return { nodes: returnNodes, hasExtraNode };
    }
    getPageMeta(query) {
        const { paging } = query;
        if (!paging) {
            return DEFAULT_PAGING_META(query);
        }
        return { opts: this.strategy.fromCursorArgs(paging), query };
    }
    createPagingResult(results, pagingMeta, totalCount) {
        var _a, _b;
        const { nodes, hasExtraNode } = results;
        const { isForward, hasBefore } = pagingMeta.opts;
        const edges = nodes.map((node, i) => ({
            node,
            cursor: this.strategy.toCursor(node, i, pagingMeta.opts, pagingMeta.query),
        }));
        const pageInfo = {
            startCursor: (_a = edges[0]) === null || _a === void 0 ? void 0 : _a.cursor,
            endCursor: (_b = edges[edges.length - 1]) === null || _b === void 0 ? void 0 : _b.cursor,
            // if we have are going forward and have an extra node or there was a before cursor
            hasNextPage: isForward ? hasExtraNode : hasBefore,
            // we have a previous page if we are going backwards and have an extra node.
            hasPreviousPage: this.hasPreviousPage(results, pagingMeta),
        };
        return { edges, pageInfo, totalCount };
    }
    hasPreviousPage(results, pagingMeta) {
        const { hasExtraNode } = results;
        const { opts } = pagingMeta;
        return opts.isBackward ? hasExtraNode : !this.strategy.isEmptyCursor(opts);
    }
    isEmptyPage(results, pagingMeta) {
        // it is an empty page if
        // 1. we dont have an extra node
        // 2. there were no nodes returned
        // 3. we're paging forward
        // 4. and we dont have an offset
        const { opts } = pagingMeta;
        const isEmpty = !results.hasExtraNode && !results.nodes.length && pagingMeta.opts.isForward;
        return isEmpty && this.strategy.isEmptyCursor(opts);
    }
}
exports.CursorPager = CursorPager;
//# sourceMappingURL=pager.js.map