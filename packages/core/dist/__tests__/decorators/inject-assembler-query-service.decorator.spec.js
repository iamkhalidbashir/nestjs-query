"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const common_1 = require("@nestjs/common");
const src_1 = require("../../src");
const helpers_1 = require("../../src/decorators/helpers");
describe('@InjectAssemblerQueryService', () => {
    class Foo {
    }
    class Bar {
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    class TestAssembler extends src_1.DefaultAssembler {
    }
    it('call inject with the correct key', async () => {
        let TestService = class TestService {
            constructor(service) {
                this.service = service;
            }
        };
        TestService = (0, tslib_1.__decorate)([
            (0, common_1.Injectable)(),
            (0, tslib_1.__param)(0, (0, src_1.InjectAssemblerQueryService)(TestAssembler)),
            (0, tslib_1.__metadata)("design:paramtypes", [Object])
        ], TestService);
        const noopQueryService = new src_1.NoOpQueryService();
        const moduleRef = await testing_1.Test.createTestingModule({
            providers: [
                TestService,
                {
                    provide: (0, helpers_1.getAssemblerQueryServiceToken)(TestAssembler),
                    useValue: noopQueryService,
                },
            ],
        }).compile();
        const testService = moduleRef.get(TestService);
        expect(testService).toBeInstanceOf(TestService);
        return expect(testService.service).toBe(noopQueryService);
    });
});
//# sourceMappingURL=inject-assembler-query-service.decorator.spec.js.map