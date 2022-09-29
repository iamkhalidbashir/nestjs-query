"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateArrayConnectionType = void 0;
const core_1 = require("@nestjs-query/core");
const reflector = new core_1.ValueReflector('nestjs-query:array-connection-type');
function getOrCreateArrayConnectionType(TItemClass) {
    return reflector.memoize(TItemClass, () => {
        class AbstractConnection extends Array {
            static async createFromPromise(queryMany, query) {
                // remove paging from the query because the ArrayConnection does not support paging.
                const { paging, ...rest } = query;
                return queryMany(rest);
            }
        }
        AbstractConnection.resolveType = [TItemClass];
        return AbstractConnection;
    });
}
exports.getOrCreateArrayConnectionType = getOrCreateArrayConnectionType;
//# sourceMappingURL=array-connection.type.js.map