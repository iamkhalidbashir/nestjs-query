"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryService = void 0;
const common_1 = require("@nestjs/common");
/**
 * QueryService decorator to register with nestjs-query
 * @param DTOClass - the DTO class that the QueryService is used for.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare,@typescript-eslint/no-unused-vars -- intentional
function QueryService(DTOClass) {
    return (cls) => (0, common_1.Injectable)()(cls);
}
exports.QueryService = QueryService;
//# sourceMappingURL=query.service.js.map