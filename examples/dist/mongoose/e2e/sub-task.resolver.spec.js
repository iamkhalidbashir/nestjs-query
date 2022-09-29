"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
describe('SubTaskResolver (mongoose - e2e)', () => {
    let app;
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
    const toGraphqlSubTask = (subTask) => ({
        id: subTask.id,
        description: subTask.description,
        title: subTask.title,
        completed: subTask.completed,
    });
    const toGraphqlSubTasks = (subTasks) => subTasks.map((st) => toGraphqlSubTask(st));
    const subTaskIds = fixtures_1.SUB_TASKS.map((td) => td.id);
    const graphqlIds = subTaskIds.map((id) => `"${id}"`);
    describe('find one', () => {
        it(`should a sub task by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTask(id: "${fixtures_1.SUB_TASKS[0].id}") {
            ${graphql_fragments_1.subTaskFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    subTask: {
                        id: fixtures_1.SUB_TASKS[0].id,
                        title: 'Create Nest App - Sub Task 1',
                        completed: true,
                        description: null,
                    },
                },
            });
        }));
        it(`should return null if the sub task is not found`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTask(id: "${new mongoose_2.Types.ObjectId().toString()}") {
            ${graphql_fragments_1.subTaskFields}
          }
        }`,
        })
            .expect(200, {
            data: {
                subTask: null,
            },
        }));
        it(`should return a todo item`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTask(id: "${fixtures_1.SUB_TASKS[0].id}") {
            todoItem {
              ${graphql_fragments_1.todoItemFields}
            }
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    subTask: {
                        todoItem: {
                            id: fixtures_1.TODO_ITEMS[0].id,
                            title: 'Create Nest App',
                            completed: true,
                            description: null,
                            age: expect.any(Number),
                        },
                    },
                },
            });
        }));
    });
    describe('query', () => {
        it(`should return a connection`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTasks {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMjMifV19',
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWEifV19',
            });
            expect(totalCount).toBe(15);
            expect(edges).toHaveLength(10);
            expect(edges.map((e) => e.node)).toEqual(toGraphqlSubTasks(fixtures_1.SUB_TASKS.slice(0, 10)));
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTasks(filter: { id: { in: [${graphqlIds.slice(0, 3).join(',')}] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWMifV19',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWEifV19',
            });
            expect(totalCount).toBe(3);
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual(toGraphqlSubTasks(fixtures_1.SUB_TASKS.slice(0, 3)));
        }));
        it(`should allow sorting`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTasks(sorting: [{field: id, direction: DESC}]) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            totalCount
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo, totalCount } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWYifV19',
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMjgifV19',
            });
            expect(totalCount).toBe(15);
            expect(edges).toHaveLength(10);
            expect(edges.map((e) => e.node)).toEqual(toGraphqlSubTasks(fixtures_1.SUB_TASKS.slice().reverse().slice(0, 10)));
        }));
        describe('paging', () => {
            it(`should allow paging with the 'first' field`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          subTasks(paging: {first: 2}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.subTasks;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWIifV19',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWEifV19',
                });
                expect(totalCount).toBe(15);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(toGraphqlSubTasks(fixtures_1.SUB_TASKS.slice(0, 2)));
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          subTasks(paging: {first: 2, after: "eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWIifV19"}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
            totalCount
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo, totalCount } = body.data.subTasks;
                expect(pageInfo).toEqual({
                    endCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWQifV19',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'eyJ0eXBlIjoia2V5c2V0IiwiZmllbGRzIjpbeyJmaWVsZCI6ImlkIiwidmFsdWUiOiI1Zjc0ZWQ5MzZjM2FmYWVhYWRiOGYzMWMifV19',
                });
                expect(totalCount).toBe(15);
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(toGraphqlSubTasks(fixtures_1.SUB_TASKS.slice(2, 4)));
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
          subTaskAggregate {
              ${graphql_fragments_1.subTaskAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.subTaskAggregate;
            expect(res).toEqual([
                {
                    count: { id: 15, title: 15, description: 0, completed: 15 },
                    min: {
                        id: fixtures_1.SUB_TASKS[0].id,
                        title: 'Add Todo Item Resolver - Sub Task 1',
                        description: null,
                    },
                    max: {
                        id: fixtures_1.SUB_TASKS[fixtures_1.SUB_TASKS.length - 1].id,
                        title: 'How to create item With Sub Tasks - Sub Task 3',
                        description: null,
                    },
                },
            ]);
        }));
        it(`should allow filtering`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{ 
          subTaskAggregate(filter: {completed: {is: true}}) {
              ${graphql_fragments_1.subTaskAggregateFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const res = body.data.subTaskAggregate;
            expect(res).toEqual([
                {
                    count: { id: 5, title: 5, description: 0, completed: 5 },
                    min: { id: fixtures_1.SUB_TASKS[0].id, title: 'Add Todo Item Resolver - Sub Task 1', description: null },
                    max: {
                        id: fixtures_1.SUB_TASKS[12].id,
                        title: 'How to create item With Sub Tasks - Sub Task 1',
                        description: null,
                    },
                },
            ]);
        }));
    });
    describe('create one', () => {
        it('should allow creating a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneSubTask(
              input: {
                subTask: { title: "Test SubTask", completed: false, todoItem: "${fixtures_1.TODO_ITEMS[0].id}" }
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createOneSubTask: {
                        id: expect.any(String),
                        title: 'Test SubTask',
                        description: null,
                        completed: false,
                    },
                },
            });
        }));
        it('should validate a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneSubTask(
              input: {
                subTask: { title: "", completed: false, todoItem: "${fixtures_1.TODO_ITEMS[0].id}" }
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title should not be empty');
        }));
    });
    describe('create many', () => {
        it('should allow creating a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManySubTasks(
              input: {
                subTasks: [
                  { title: "Test Create Many SubTask - 1", completed: false, todoItem: "${fixtures_1.TODO_ITEMS[0].id}" },
                  { title: "Test Create Many SubTask - 2", completed: true, todoItem: "${fixtures_1.TODO_ITEMS[0].id}" },
                ]
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    createManySubTasks: [
                        {
                            id: expect.any(String),
                            title: 'Test Create Many SubTask - 1',
                            description: null,
                            completed: false,
                        },
                        {
                            id: expect.any(String),
                            title: 'Test Create Many SubTask - 2',
                            description: null,
                            completed: true,
                        },
                    ],
                },
            });
        }));
        it('should validate a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManySubTasks(
              input: {
                subTasks: [{ title: "", completed: false, todoItem: "2" }]
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title should not be empty');
        }));
    });
    describe('update one', () => {
        it('should allow updating a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneSubTask(
              input: {
                id: ${graphqlIds[0]},
                update: { title: "Update Test Sub Task", completed: true }
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                updateOneSubTask: {
                    id: subTaskIds[0],
                    title: 'Update Test Sub Task',
                    description: null,
                    completed: true,
                },
            },
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneSubTask(
              input: {
                update: { title: "Update Test Sub Task" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateOneSubTaskInput.id" of required type "ID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneSubTask(
              input: {
                id: "16",
                update: { title: "" }
              }
            ) {
              id
              title
              completed
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(JSON.stringify(body.errors[0])).toContain('title should not be empty');
        }));
    });
    describe('update many', () => {
        it('should allow updating a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManySubTasks(
              input: {
                filter: {id: { in: [${graphqlIds[0]}, ${graphqlIds[1]}]} },
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                updateManySubTasks: {
                    updatedCount: 2,
                },
            },
        }));
        it('should require a filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManySubTasks(
              input: {
                update: { title: "Update Many Test", completed: true }
              }
            ) {
              updatedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "UpdateManySubTasksInput.filter" of required type "SubTaskUpdateFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateManySubTasks(
              input: {
                filter: { },
                update: { title: "Update Many Test", completed: true }
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
        it('should allow deleting a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneSubTask(
              input: { id: ${graphqlIds[0]} }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    deleteOneSubTask: toGraphqlSubTask(fixtures_1.SUB_TASKS[0]),
                },
            });
        }));
        it('should require an id', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteOneSubTask(
              input: { }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteOneSubTaskInput.id" of required type "ID!" was not provided.');
        }));
    });
    describe('delete many', () => {
        it('should allow updating a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManySubTasks(
              input: {
                filter: {id: { in: [${graphqlIds[0]}, ${graphqlIds[1]}]} },
              }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteManySubTasks: {
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
            deleteManySubTasks(
              input: { }
            ) {
              deletedCount
            }
        }`,
        })
            .expect(400)
            .then(({ body }) => {
            expect(body.errors).toHaveLength(1);
            expect(body.errors[0].message).toBe('Field "DeleteManySubTasksInput.filter" of required type "SubTaskDeleteFilter!" was not provided.');
        }));
        it('should require a non-empty filter', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            deleteManySubTasks(
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
    describe('setTodoItemOnSubTask', () => {
        it('should set a the todoItem on a subtask', () => {
            const todoItem = fixtures_1.TODO_ITEMS[1];
            return (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `mutation {
          setTodoItemOnSubTask(input: { id: ${graphqlIds[0]}, relationId: "${fixtures_1.TODO_ITEMS[1].id}" }) {
            id
            title
            todoItem {
              ${graphql_fragments_1.todoItemFields}
            }
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                expect(body).toEqual({
                    data: {
                        setTodoItemOnSubTask: {
                            id: subTaskIds[0],
                            title: fixtures_1.SUB_TASKS[0].title,
                            todoItem: {
                                id: todoItem.id,
                                title: todoItem.title,
                                completed: todoItem.completed,
                                description: null,
                                age: expect.any(Number),
                            },
                        },
                    },
                });
            });
        });
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=sub-task.resolver.spec.js.map