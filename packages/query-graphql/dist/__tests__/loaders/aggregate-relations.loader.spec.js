"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mockito_1 = require("ts-mockito");
const loader_1 = require("../../src/loader");
describe('AggregateRelationsLoader', () => {
    describe('createLoader', () => {
        class DTO {
        }
        class RelationDTO {
        }
        it('should return a function that accepts aggregate args', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.AggregateRelationsLoader(RelationDTO, 'relation');
            expect(queryRelationsLoader.createLoader((0, ts_mockito_1.instance)(service))).toBeInstanceOf(Function);
        });
        it('should try to load the relations with the query args', () => {
            const service = (0, ts_mockito_1.mock)();
            const aggregateRelationsLoader = new loader_1.AggregateRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const filter = {};
            const aggregate = { count: ['id'] };
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            const dto1Aggregate = [{ count: { id: 2 } }];
            const dto2Aggregate = [{ count: { id: 3 } }];
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)(filter), (0, ts_mockito_1.deepEqual)(aggregate))).thenResolve(new Map([
                [dtos[0], dto1Aggregate],
                [dtos[1], dto2Aggregate],
            ]));
            return expect(aggregateRelationsLoader([
                { dto: dtos[0], filter, aggregate },
                { dto: dtos[1], filter, aggregate },
            ])).resolves.toEqual([dto1Aggregate, dto2Aggregate]);
        });
        it('should try return an empty aggregate result for each dto if no results are found', () => {
            const service = (0, ts_mockito_1.mock)();
            const aggregateRelationsLoader = new loader_1.AggregateRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const filter = {};
            const aggregate = { count: ['id'] };
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }];
            const dto1Aggregate = [{ count: { id: 2 } }];
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)(dtos), (0, ts_mockito_1.deepEqual)(filter), (0, ts_mockito_1.deepEqual)(aggregate))).thenResolve(new Map([[dtos[0], dto1Aggregate]]));
            return expect(aggregateRelationsLoader([
                { dto: dtos[0], filter, aggregate },
                { dto: dtos[1], filter, aggregate },
            ])).resolves.toEqual([dto1Aggregate, {}]);
        });
        it('should group queryRelations calls by filter and return in the correct order', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.AggregateRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const filter1 = { id: { gt: 'a' } };
            const filter2 = {};
            const aggregate = { count: ['id'] };
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }, { id: 'dto-3' }, { id: 'dto-4' }];
            const dto1Aggregate = [{ count: { id: 2 } }];
            const dto2Aggregate = [{ count: { id: 3 } }];
            const dto3Aggregate = [{ count: { id: 4 } }];
            const dto4Aggregate = [{ count: { id: 5 } }];
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[0], dtos[2]]), (0, ts_mockito_1.deepEqual)(filter1), (0, ts_mockito_1.deepEqual)(aggregate))).thenResolve(new Map([
                [dtos[0], dto1Aggregate],
                [dtos[2], dto3Aggregate],
            ]));
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[1], dtos[3]]), (0, ts_mockito_1.deepEqual)(filter2), (0, ts_mockito_1.deepEqual)(aggregate))).thenResolve(new Map([
                [dtos[1], dto2Aggregate],
                [dtos[3], dto4Aggregate],
            ]));
            return expect(queryRelationsLoader([
                { dto: dtos[0], filter: filter1, aggregate },
                { dto: dtos[1], filter: filter2, aggregate },
                { dto: dtos[2], filter: filter1, aggregate },
                { dto: dtos[3], filter: filter2, aggregate },
            ])).resolves.toEqual([dto1Aggregate, dto2Aggregate, dto3Aggregate, dto4Aggregate]);
        });
        it('should group queryRelations calls by aggregate and return in the correct order', () => {
            const service = (0, ts_mockito_1.mock)();
            const queryRelationsLoader = new loader_1.AggregateRelationsLoader(RelationDTO, 'relation').createLoader((0, ts_mockito_1.instance)(service));
            const filter = {};
            const aggregate1 = { count: ['id'] };
            const aggregate2 = { sum: ['id'] };
            const dtos = [{ id: 'dto-1' }, { id: 'dto-2' }, { id: 'dto-3' }, { id: 'dto-4' }];
            const dto1Aggregate = [{ count: { id: 2 } }];
            const dto2Aggregate = [{ sum: { id: 3 } }];
            const dto3Aggregate = [{ count: { id: 4 } }];
            const dto4Aggregate = [{ sum: { id: 5 } }];
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[0], dtos[2]]), (0, ts_mockito_1.deepEqual)(filter), (0, ts_mockito_1.deepEqual)(aggregate1))).thenResolve(new Map([
                [dtos[0], dto1Aggregate],
                [dtos[2], dto3Aggregate],
            ]));
            (0, ts_mockito_1.when)(service.aggregateRelations(RelationDTO, 'relation', (0, ts_mockito_1.deepEqual)([dtos[1], dtos[3]]), (0, ts_mockito_1.deepEqual)(filter), (0, ts_mockito_1.deepEqual)(aggregate2))).thenResolve(new Map([
                [dtos[1], dto2Aggregate],
                [dtos[3], dto4Aggregate],
            ]));
            return expect(queryRelationsLoader([
                { dto: dtos[0], filter, aggregate: aggregate1 },
                { dto: dtos[1], filter, aggregate: aggregate2 },
                { dto: dtos[2], filter, aggregate: aggregate1 },
                { dto: dtos[3], filter, aggregate: aggregate2 },
            ])).resolves.toEqual([dto1Aggregate, dto2Aggregate, dto3Aggregate, dto4Aggregate]);
        });
    });
});
//# sourceMappingURL=aggregate-relations.loader.spec.js.map