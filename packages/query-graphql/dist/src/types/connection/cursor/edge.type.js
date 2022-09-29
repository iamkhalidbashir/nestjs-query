"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateEdgeType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@nestjs-query/core");
const cursor_scalar_1 = require("../../cursor.scalar");
const common_1 = require("../../../common");
const reflector = new core_1.ValueReflector('nestjs-query:edge-type');
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
function getOrCreateEdgeType(DTOClass) {
    return reflector.memoize(DTOClass, () => {
        const objName = (0, common_1.getGraphqlObjectName)(DTOClass, 'Unable to make EdgeType for class.');
        let AbstractEdge = class AbstractEdge {
            constructor(node, cursor) {
                this.node = node;
                this.cursor = cursor;
            }
        };
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => DTOClass, { description: `The node containing the ${objName}` }),
            (0, tslib_1.__metadata)("design:type", Object)
        ], AbstractEdge.prototype, "node", void 0);
        (0, tslib_1.__decorate)([
            (0, graphql_1.Field)(() => cursor_scalar_1.ConnectionCursorScalar, { description: 'Cursor for this node.' }),
            (0, tslib_1.__metadata)("design:type", String)
        ], AbstractEdge.prototype, "cursor", void 0);
        AbstractEdge = (0, tslib_1.__decorate)([
            (0, graphql_1.ObjectType)(`${objName}Edge`),
            (0, tslib_1.__metadata)("design:paramtypes", [Object, String])
        ], AbstractEdge);
        return AbstractEdge;
    });
}
exports.getOrCreateEdgeType = getOrCreateEdgeType;
//# sourceMappingURL=edge.type.js.map