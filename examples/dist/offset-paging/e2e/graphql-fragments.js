"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offsetConnection = exports.nodes = exports.pageInfoField = exports.tagFields = exports.subTaskFields = exports.todoItemFields = void 0;
exports.todoItemFields = `
    id
    title
    completed
    description
  `;
exports.subTaskFields = `
id
title
description
completed
todoItemId
`;
exports.tagFields = `
id
name
`;
exports.pageInfoField = `
pageInfo{
  hasNextPage
  hasPreviousPage
}
`;
const nodes = (fields) => `
  nodes {  
    ${fields}        
  }  
  `;
exports.nodes = nodes;
const offsetConnection = (fields) => `
  ${(0, exports.nodes)(fields)}
  ${exports.pageInfoField}
`;
exports.offsetConnection = offsetConnection;
//# sourceMappingURL=graphql-fragments.js.map