"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortNulls = exports.SortDirection = void 0;
/**
 * Enum for sorting either ASC or DESC.
 */
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
/**
 * Null sort option.
 */
var SortNulls;
(function (SortNulls) {
    /**
     * All nulls will be first.
     */
    SortNulls["NULLS_FIRST"] = "NULLS FIRST";
    /**
     * All nulls will be last.
     */
    SortNulls["NULLS_LAST"] = "NULLS LAST";
})(SortNulls = exports.SortNulls || (exports.SortNulls = {}));
//# sourceMappingURL=sort-field.interface.js.map