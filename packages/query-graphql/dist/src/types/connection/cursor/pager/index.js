"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPager = void 0;
const decorators_1 = require("../../../../decorators");
const pager_1 = require("./pager");
const strategies_1 = require("./strategies");
// default pager factory to plug in addition paging strategies later on.
const createPager = (DTOClass, opts) => {
    const keySet = opts.disableKeySetPagination ? undefined : (0, decorators_1.getKeySet)(DTOClass);
    if (keySet && keySet.length) {
        return new pager_1.CursorPager(new strategies_1.KeysetPagerStrategy(DTOClass, keySet));
    }
    return new pager_1.CursorPager(new strategies_1.LimitOffsetPagerStrategy());
};
exports.createPager = createPager;
//# sourceMappingURL=index.js.map