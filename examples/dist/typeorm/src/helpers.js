"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserName = void 0;
const constants_1 = require("./constants");
const getUserName = (context) => context.request.headers[constants_1.USER_HEADER_NAME];
exports.getUserName = getUserName;
//# sourceMappingURL=helpers.js.map