"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const src_1 = require("../../src");
describe('ConnectionCursorScalar', () => {
    describe('#parseValue', () => {
        it('should parse a value', () => {
            expect(src_1.ConnectionCursorScalar.parseValue('aaa')).toBe('aaa');
        });
    });
    describe('#serialize', () => {
        it('should serialize a value', () => {
            expect(src_1.ConnectionCursorScalar.serialize('aaa')).toBe('aaa');
        });
    });
    describe('#parseLiteral', () => {
        it('should parse a literal', () => {
            expect(src_1.ConnectionCursorScalar.parseLiteral({ kind: graphql_1.Kind.STRING, value: 'aaa' }, {})).toBe('aaa');
        });
        it('should return null if the ast.kind is not a string', () => {
            expect(src_1.ConnectionCursorScalar.parseLiteral({ kind: graphql_1.Kind.FLOAT, value: '1.0' }, {})).toBeNull();
        });
    });
});
//# sourceMappingURL=cursor.scalar.spec.js.map