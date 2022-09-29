"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const __fixtures__1 = require("./__fixtures__");
describe('NestjsQueryTypegooseModule', () => {
    it('should create a module', () => {
        const typeOrmModule = src_1.NestjsQueryMongooseModule.forFeature([
            { document: __fixtures__1.TestEntity, name: __fixtures__1.TestEntity.name, schema: __fixtures__1.TestEntitySchema },
        ]);
        expect(typeOrmModule.imports).toHaveLength(1);
        expect(typeOrmModule.module).toBe(src_1.NestjsQueryMongooseModule);
        expect(typeOrmModule.providers).toHaveLength(1);
        expect(typeOrmModule.exports).toHaveLength(2);
    });
});
//# sourceMappingURL=module.spec.js.map