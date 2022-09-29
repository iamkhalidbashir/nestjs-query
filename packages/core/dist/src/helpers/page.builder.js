"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageBuilder = void 0;
class PageBuilder {
    static build(paging) {
        return (dtos) => {
            const { limit = dtos.length, offset = 0 } = paging;
            return dtos.slice(offset, limit + offset);
        };
    }
}
exports.PageBuilder = PageBuilder;
//# sourceMappingURL=page.builder.js.map