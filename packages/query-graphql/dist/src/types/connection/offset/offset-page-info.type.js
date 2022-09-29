"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateOffsetPageInfoType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
/** @internal */
let pageInfoType = null;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const getOrCreateOffsetPageInfoType = () => {
    if (pageInfoType) {
        return pageInfoType;
    }
    let PageInfoTypeImpl = class PageInfoTypeImpl {
        constructor(hasNextPage, hasPreviousPage) {
            this.hasNextPage = hasNextPage;
            this.hasPreviousPage = hasPreviousPage;
        }
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true, description: 'true if paging forward and there are more records.' }),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], PageInfoTypeImpl.prototype, "hasNextPage", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => Boolean, { nullable: true, description: 'true if paging backwards and there are more records.' }),
        (0, tslib_1.__metadata)("design:type", Boolean)
    ], PageInfoTypeImpl.prototype, "hasPreviousPage", void 0);
    PageInfoTypeImpl = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)('OffsetPageInfo'),
        (0, tslib_1.__metadata)("design:paramtypes", [Boolean, Boolean])
    ], PageInfoTypeImpl);
    pageInfoType = PageInfoTypeImpl;
    return pageInfoType;
};
exports.getOrCreateOffsetPageInfoType = getOrCreateOffsetPageInfoType;
//# sourceMappingURL=offset-page-info.type.js.map