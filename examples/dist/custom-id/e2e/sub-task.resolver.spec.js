"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testing_1 = require("@nestjs/testing");
const supertest_1 = (0, tslib_1.__importDefault)(require("supertest"));
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_module_1 = require("../src/app.module");
const fixtures_1 = require("./fixtures");
const graphql_fragments_1 = require("./graphql-fragments");
describe('SubTaskResolver (custom-id - e2e)', () => {
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
        await (0, fixtures_1.refresh)(app.get(typeorm_1.Connection));
    });
    afterAll(() => (0, fixtures_1.refresh)(app.get(typeorm_1.Connection)));
    const subTasks = [
        {
            id: 'aWQ6MQ==',
            title: 'Create Nest App - Sub Task 1',
            completed: true,
            description: null,
            todoItemId: 'aWQ6MQ==',
        },
        {
            id: 'aWQ6Mg==',
            title: 'Create Nest App - Sub Task 2',
            completed: false,
            description: null,
            todoItemId: 'aWQ6MQ==',
        },
        {
            id: 'aWQ6Mw==',
            title: 'Create Nest App - Sub Task 3',
            completed: false,
            description: null,
            todoItemId: 'aWQ6MQ==',
        },
        { id: 'aWQ6NA==', title: 'Create Entity - Sub Task 1', completed: true, description: null, todoItemId: 'aWQ6Mg==' },
        {
            id: 'aWQ6NQ==',
            title: 'Create Entity - Sub Task 2',
            completed: false,
            description: null,
            todoItemId: 'aWQ6Mg==',
        },
        {
            id: 'aWQ6Ng==',
            title: 'Create Entity - Sub Task 3',
            completed: false,
            description: null,
            todoItemId: 'aWQ6Mg==',
        },
        {
            id: 'aWQ6Nw==',
            title: 'Create Entity Service - Sub Task 1',
            completed: true,
            description: null,
            todoItemId: 'aWQ6Mw==',
        },
        {
            id: 'aWQ6OA==',
            title: 'Create Entity Service - Sub Task 2',
            completed: false,
            description: null,
            todoItemId: 'aWQ6Mw==',
        },
        {
            id: 'aWQ6OQ==',
            title: 'Create Entity Service - Sub Task 3',
            completed: false,
            description: null,
            todoItemId: 'aWQ6Mw==',
        },
        {
            id: 'aWQ6MTA=',
            title: 'Add Todo Item Resolver - Sub Task 1',
            completed: true,
            description: null,
            todoItemId: 'aWQ6NA==',
        },
        {
            completed: false,
            description: null,
            id: 'aWQ6MTE=',
            title: 'Add Todo Item Resolver - Sub Task 2',
            todoItemId: 'aWQ6NA==',
        },
        {
            completed: false,
            description: null,
            id: 'aWQ6MTI=',
            title: 'Add Todo Item Resolver - Sub Task 3',
            todoItemId: 'aWQ6NA==',
        },
        {
            completed: true,
            description: null,
            id: 'aWQ6MTM=',
            title: 'How to create item With Sub Tasks - Sub Task 1',
            todoItemId: 'aWQ6NQ==',
        },
        {
            completed: false,
            description: null,
            id: 'aWQ6MTQ=',
            title: 'How to create item With Sub Tasks - Sub Task 2',
            todoItemId: 'aWQ6NQ==',
        },
        {
            completed: false,
            description: null,
            id: 'aWQ6MTU=',
            title: 'How to create item With Sub Tasks - Sub Task 3',
            todoItemId: 'aWQ6NQ==',
        },
    ];
    describe('find one', () => {
        it(`should a sub task by id`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTask(id: "aWQ6MQ==") {
            ${graphql_fragments_1.subTaskFields}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            expect(body).toEqual({
                data: {
                    subTask: {
                        id: 'aWQ6MQ==',
                        title: 'Create Nest App - Sub Task 1',
                        completed: true,
                        description: null,
                        todoItemId: 'aWQ6MQ==',
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
          subTask(id: "aWQ6MTAw") {
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
          subTask(id: "aWQ6MQ==") {
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
                        todoItem: { id: 'aWQ6MQ==', title: 'Create Nest App', completed: true, description: null },
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
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(10);
            expect(edges.map((e) => e.node)).toEqual(subTasks.slice(0, 10));
        }));
        it(`should allow querying`, () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `{
          subTasks(filter: { id: { in: ["aWQ6MQ==", "aWQ6Mg==", "aWQ6Mw=="] } }) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(3);
            expect(edges.map((e) => e.node)).toEqual(subTasks.slice(0, 3));
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
          }
        }`,
        })
            .expect(200)
            .then(({ body }) => {
            const { edges, pageInfo } = body.data.subTasks;
            expect(pageInfo).toEqual({
                endCursor: 'YXJyYXljb25uZWN0aW9uOjk=',
                hasNextPage: true,
                hasPreviousPage: false,
                startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
            });
            expect(edges).toHaveLength(10);
            expect(edges.map((e) => e.node)).toEqual(subTasks.slice().reverse().slice(0, 10));
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
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.subTasks;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                    hasNextPage: true,
                    hasPreviousPage: false,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(subTasks.slice(0, 2));
            }));
            it(`should allow paging with the 'first' field and 'after'`, () => (0, supertest_1.default)(app.getHttpServer())
                .post('/graphql')
                .send({
                operationName: null,
                variables: {},
                query: `{
          subTasks(paging: {first: 2, after: "YXJyYXljb25uZWN0aW9uOjE="}) {
            ${graphql_fragments_1.pageInfoField}
            ${(0, graphql_fragments_1.edgeNodes)(graphql_fragments_1.subTaskFields)}
          }
        }`,
            })
                .expect(200)
                .then(({ body }) => {
                const { edges, pageInfo } = body.data.subTasks;
                expect(pageInfo).toEqual({
                    endCursor: 'YXJyYXljb25uZWN0aW9uOjM=',
                    hasNextPage: true,
                    hasPreviousPage: true,
                    startCursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                });
                expect(edges).toHaveLength(2);
                expect(edges.map((e) => e.node)).toEqual(subTasks.slice(2, 4));
            }));
        });
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
                subTask: { title: "Test SubTask", completed: false, todoItemId: "aWQ6MQ==" }
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createOneSubTask: {
                    id: 'aWQ6MTY=',
                    title: 'Test SubTask',
                    description: null,
                    completed: false,
                    todoItemId: 'aWQ6MQ==',
                },
            },
        }));
        it('should validate a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createOneSubTask(
              input: {
                subTask: { title: "", completed: false, todoItemId: "aWQ6MQ==" }
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
                  { title: "Test Create Many SubTask - 1", completed: false, todoItemId: "aWQ6Mg==" },
                  { title: "Test Create Many SubTask - 2", completed: true, todoItemId: "aWQ6Mg==" },
                ]
              }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                createManySubTasks: [
                    {
                        id: 'aWQ6MTc=',
                        title: 'Test Create Many SubTask - 1',
                        description: null,
                        completed: false,
                        todoItemId: 'aWQ6Mg==',
                    },
                    {
                        id: 'aWQ6MTg=',
                        title: 'Test Create Many SubTask - 2',
                        description: null,
                        completed: true,
                        todoItemId: 'aWQ6Mg==',
                    },
                ],
            },
        }));
        it('should validate a subTask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            createManySubTasks(
              input: {
                subTasks: [{ title: "", completed: false, todoItemId: "aWQ6Mg==" }]
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
                id: "aWQ6MTY=",
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
                    id: 'aWQ6MTY=',
                    title: 'Update Test Sub Task',
                    description: null,
                    completed: true,
                    todoItemId: 'aWQ6MQ==',
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
            expect(body.errors[0].message).toBe('Field "UpdateOneSubTaskInput.id" of required type "CustomID!" was not provided.');
        }));
        it('should validate an update', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
            updateOneSubTask(
              input: {
                id: "aWQ6MTY=",
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
                filter: {id: { in: ["aWQ6MTc=", "aWQ6MTg="]} },
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
              input: { id: "aWQ6MTY=" }
            ) {
              ${graphql_fragments_1.subTaskFields}
            }
        }`,
        })
            .expect(200, {
            data: {
                deleteOneSubTask: {
                    id: null,
                    title: 'Update Test Sub Task',
                    completed: true,
                    description: null,
                    todoItemId: 'aWQ6MQ==',
                },
            },
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
            expect(body.errors[0].message).toBe('Field "DeleteOneSubTaskInput.id" of required type "CustomID!" was not provided.');
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
                filter: {id: { in: ["aWQ6MTc=", "aWQ6MTg="]} },
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
        it('should set a the todoItem on a subtask', () => (0, supertest_1.default)(app.getHttpServer())
            .post('/graphql')
            .send({
            operationName: null,
            variables: {},
            query: `mutation {
          setTodoItemOnSubTask(input: { id: "aWQ6MQ==", relationId: "aWQ6Mg==" }) {
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
                        id: 'aWQ6MQ==',
                        title: 'Create Nest App - Sub Task 1',
                        todoItem: { id: 'aWQ6Mg==', title: 'Create Entity', completed: false, description: null },
                    },
                },
            });
        }));
    });
    afterAll(async () => {
        await app.close();
    });
});
//# sourceMappingURL=sub-task.resolver.spec.js.map