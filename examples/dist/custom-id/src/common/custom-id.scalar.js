"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIDScalar = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let CustomIDScalar = class CustomIDScalar {
    constructor() {
        this.description = 'Global ID custom scalar type';
        this.idPrefix = 'id:';
    }
    parseValue(value) {
        return parseInt(Buffer.from(value, 'base64').toString('utf8').replace(this.idPrefix, ''), 10);
    }
    serialize(value) {
        return Buffer.from(`${this.idPrefix}${value}`, 'utf8').toString('base64');
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.STRING) {
            return this.parseValue(ast.value);
        }
        return null;
    }
};
CustomIDScalar = (0, tslib_1.__decorate)([
    (0, graphql_1.Scalar)('CustomID')
], CustomIDScalar);
exports.CustomIDScalar = CustomIDScalar;
//# sourceMappingURL=custom-id.scalar.js.map