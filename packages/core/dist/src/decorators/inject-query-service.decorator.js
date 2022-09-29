"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectQueryService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const InjectQueryService = (DTOClass) => (0, common_1.Inject)((0, helpers_1.getQueryServiceToken)(DTOClass));
exports.InjectQueryService = InjectQueryService;
//# sourceMappingURL=inject-query-service.decorator.js.map