"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAssemblerQueryService = void 0;
const common_1 = require("@nestjs/common");
const helpers_1 = require("./helpers");
const InjectAssemblerQueryService = (AssemblerClass) => (0, common_1.Inject)((0, helpers_1.getAssemblerQueryServiceToken)(AssemblerClass));
exports.InjectAssemblerQueryService = InjectAssemblerQueryService;
//# sourceMappingURL=inject-assembler-query-service.decorator.js.map