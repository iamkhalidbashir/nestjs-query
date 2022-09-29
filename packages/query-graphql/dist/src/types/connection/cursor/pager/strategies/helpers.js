"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = exports.hasBeforeCursor = exports.isForwardPaging = exports.isBackwardPaging = void 0;
function isBackwardPaging(cursor) {
    return typeof cursor.last !== 'undefined';
}
exports.isBackwardPaging = isBackwardPaging;
function isForwardPaging(cursor) {
    return !isBackwardPaging(cursor);
}
exports.isForwardPaging = isForwardPaging;
function hasBeforeCursor(cursor) {
    return isBackwardPaging(cursor) && !!cursor.before;
}
exports.hasBeforeCursor = hasBeforeCursor;
function encodeBase64(str) {
    return Buffer.from(str, 'utf8').toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=helpers.js.map