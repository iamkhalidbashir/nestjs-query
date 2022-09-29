"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs-query/core");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
const constants_1 = require("../src/constants");
const tag_entity_1 = require("../src/tag/tag.entity");
describe('TagResolver (mongoose - e2e)', () => {
    let app;
    const USER_NAME = 'E2E Test';
    beforeAll(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            skipMissingProperties: false,
            forbidUnknownValues: true,
        }));
        await app.init();
        await (0, fixtures_1.refresh)(app.get((0, mongoose_1.getConnectionToken)()));
    });
    afterEach(() => (0, fixtures_1.refresh)(app.get((0, mongoose_1.getConnectionToken)())));
    describe('find one', () => {
        it(`should find a tag by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: "${fixtures_1.TAGS[0].id}") {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, { data: { tag: fixtures_1.TAGS[0] } }));
        it(`should return null if the tag is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: "${new mongoose_2.Types.ObjectId().toString()}") {
            ${graphql_fragments_1.tagFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                tag: null,
            },
        }));
        it(`should return todoItems as a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: "${fixtures_1.TAGS[0].id}") {
            todoItems(sorting: [{ field: id, direction: ASC }]) {
              ${graphql_fragments_1.pageInfoField}
              ${(0, graphql_fragments_1.edgeNodes)('id')}
              totalCount
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tag.todoItems;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(totalCount).toBe(2);
            expect(edges).toHaveLength(2);
            expect(edges.map((e) => e.node.id)).toEqual(fixtures_1.TODO_ITEMS.slice(0, 2).map((td) => td.id));
        }));
        it(`should return todoItems aggregate`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tag(id: "${fixtures_1.TAGS[0].id}") {
            todoItemsAggregate {
              ${graphql_fragments_1.todoItemAggregateFields}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const agg = body.data.tag.todoItemsAggregate;
            expect(agg).toEqual([
                {
                    count: { completed: 2, createdAt: 2, description: 0, id: 2, title: 2, updatedAt: 2 },
                    max: { description: null, id: fixtures_1.TODO_ITEMS[1].id, title: 'Create Nest App' },
                    min: { description: null, id: fixtures_1.TODO_ITEMS[0].id, title: 'Create Entity' },
                },
            ]);
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWYifV19',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWIifV19',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual(fixtures_1.TAGS);
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(filter: { id: { in: [${fixtures_1.TAGS.slice(0, 3)
                .map((t) => `"${t.id}"`)
                .join(',')}] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWQifV19',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWIifV19',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual(fixtures_1.TAGS.slice(0, 3));
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          tags(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.tags;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWIifV19',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWYifV19',
            });
            expect(totalCount).toBe(5);
            expect(edges).toHaveLength(5);
            expect(edges.map((e) => e.node)).toEqual(fixtures_1.TAGS.slice().reverse());
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.tags;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWMifV19',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWIifV19',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(fixtures_1.TAGS.slice(0, 2));
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          tags(paging: {first: 2, after: "eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWMifV19"}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.tagFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.tags;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWUifV19',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQyNjg2YjJiYWU3YmY0YjRhYWQifV19',
                });
                expect(totalCount).toBe(5);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(fixtures_1.TAGS.slice(2, 4));
            }));
        });
    });
    describe('aggregate', () => {
        it(`should return a aggregate response`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          tagAggregate {
              ${graphql_fragments_1.tagAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.tagAggregate;
            expect(res).toEqual([
                {
                    count: { id: 5, name: 5, createdAt: 5, updatedAt: 5 },
                    min: { id: fixtures_1.TAGS[0].id, name: 'Blocked' },
                    max: { id: fixtures_1.TAGS[4].id, name: 'Work' },
                },
            ]);
        }));
        it(`should allow filtering`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          tagAggregate(filter: { name: { in: ["Urgent", "Blocked", "Work"] } }) {
              ${graphql_fragments_1.tagAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.tagAggregate;
            expect(res).toEqual([
                {
                    count: { id: 3, name: 3, createdAt: 3, updatedAt: 3 },
                    min: { id: '5f74ed2686b2bae7bf4b4aab', name: 'Blocked' },
                    max: { id: '5f74ed2686b2bae7bf4b4aaf', name: 'Work' },
                },
            ]);
        }));
    });
    describe('create one', () => {
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createOneTag: {
                        id: expect.any(String),
                        name: 'Test Tag',
                    },
                },
            });
        }));
        it('should call beforeCreateOne hook when creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.USER_HEADER_NAME, USER_NAME)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "Before Create One Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
              createdBy
            }
        }`,
        })
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createOneTag: {
                        id: expect.any(String),
                        name: 'Before Create One Tag',
                        createdBy: USER_NAME,
                    },
                },
            });
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneTag(
              input: {
                tag: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('create many', () => {
        it('should allow creating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Create Many Tag - 1" },
                  { name: "Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createManyTags: [
                        { id: expect.any(String), name: 'Create Many Tag - 1' },
                        { id: expect.any(String), name: 'Create Many Tag - 2' },
                    ],
                },
            });
        }));
        it('should call beforeCreateMany hook when creating multiple TAGS', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.USER_HEADER_NAME, USER_NAME)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [
                  { name: "Before Create Many Tag - 1" },
                  { name: "Before Create Many Tag - 2" }
                ]
              }
            ) {
              ${graphql_fragments_1.tagFields}
              createdBy
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createManyTags: [
                        { id: expect.any(String), name: 'Before Create Many Tag - 1', createdBy: USER_NAME },
                        { id: expect.any(String), name: 'Before Create Many Tag - 2', createdBy: USER_NAME },
                    ],
                },
            });
        }));
        it('should validate a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManyTags(
              input: {
                tags: [{ name: "" }]
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update one', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "${fixtures_1.TAGS[0].id}",
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTag: {
                    id: fixtures_1.TAGS[0].id,
                    name: 'Update Test Tag',
                },
            },
        }));
        it('should call beforeUpdateOne hook when updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.USER_HEADER_NAME, USER_NAME)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "${fixtures_1.TAGS[0].id}",
                update: { name: "Before Update One Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
              updatedBy
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneTag: {
                    id: fixtures_1.TAGS[0].id,
                    name: 'Before Update One Test Tag',
                    updatedBy: USER_NAME,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                update: { name: "Update Test Tag" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneTagInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneTag(
              input: {
                id: "${fixtures_1.TAGS[0].id}",
                update: { name: "" }
              }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('name should not be empty');
        }));
    });
    describe('update many', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: { id: { in: ["${fixtures_1.TAGS[0].id}", "${fixtures_1.TAGS[1].id}"]} },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTags: {
                    updatedCount: 2,
                },
            },
        }));
        it('should call beforeUpdateMany hook when updating multiple TAGS', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .set(constants_1.USER_HEADER_NAME, USER_NAME)
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: { id: { in: ["${fixtures_1.TAGS[0].id}", "${fixtures_1.TAGS[1].id}"]} },
                update: { name: "Before Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManyTags: {
                    updatedCount: 2,
                },
            },
        })
            .then(async () => {
            const queryService = app.get((0, core_1.getQueryServiceToken)(tag_entity_1.TagEntity));
            const todoItems = await queryService.query({ filter: { id: { in: [fixtures_1.TAGS[0].id, fixtures_1.TAGS[1].id] } } });
            expect(todoItems.map((ti) => ({
                id: ti.id,
                name: ti.name,
                updatedBy: ti.updatedBy,
            }))).toEqual([
                { id: fixtures_1.TAGS[0].id, name: 'Before Update Many Tag', updatedBy: USER_NAME },
                { id: fixtures_1.TAGS[1].id, name: 'Before Update Many Tag', updatedBy: USER_NAME },
            ]);
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManyTagsInput.filter" of required type "TagUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManyTags(
              input: {
                filter: { },
                update: { name: "Update Many Tag" }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    describe('delete one', () => {
        it('should allow deleting a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { id: "${fixtures_1.TAGS[0].id}" }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneTag: {
                    id: fixtures_1.TAGS[0].id,
                    name: fixtures_1.TAGS[0].name,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneTag(
              input: { }
            ) {
              ${graphql_fragments_1.tagFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneTagInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should allow updating a tag', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: {id: { in: ["${fixtures_1.TAGS[0].id}", "${fixtures_1.TAGS[1].id}"]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteManyTags: {
                    deletedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManyTagsInput.filter" of required type "TagDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManyTags(
              input: {
                filter: { },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('filter must be a non-empty object');
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=tag.resolver.spec.js.map