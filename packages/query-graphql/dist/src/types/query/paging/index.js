"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingStrategies = exports.getOrCreateNonePagingType = exports.getOrCreateOffsetPagingType = exports.getOrCreateCursorPagingType = void 0;
var cursor_paging_type_1 = require("./cursor-paging.type");
Object.defineProperty(exports, "getOrCreateCursorPagingType", { enumerable: true, get: function () { return cursor_paging_type_1.getOrCreateCursorPagingType; } });
var offset_paging_type_1 = require("./offset-paging.type");
Object.defineProperty(exports, "getOrCreateOffsetPagingType", { enumerable: true, get: function () { return offset_paging_type_1.getOrCreateOffsetPagingType; } });
var none_paging_type_1 = require("./none-paging.type");
Object.defineProperty(exports, "getOrCreateNonePagingType", { enumerable: true, get: function () { return none_paging_type_1.getOrCreateNonePagingType; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "PagingStrategies", { enumerable: true, get: function () { return constants_1.PagingStrategies; } });
//# sourceMappingURL=index.js.map