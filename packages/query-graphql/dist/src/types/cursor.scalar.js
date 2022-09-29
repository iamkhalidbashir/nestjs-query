"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionCursorScalar = void 0;
const graphql_1 = require("graphql");
exports.ConnectionCursorScalar = new graphql_1.GraphQLScalarType({
    name: 'ConnectionCursor',
    description: 'Cursor for paging through collections',
    parseValue(value) {
        return value;
    },
    serialize(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return ast.value;
        }
        return null;
    },
});
//# sourceMappingURL=cursor.scalar.js.map