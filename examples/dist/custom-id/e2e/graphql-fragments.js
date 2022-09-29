"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeNodes = exports.pageInfoField = exports.tagFields = exports.subTaskFields = exports.todoItemFields = void 0;
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
  startCursor
  endCursor
}
`;
const edgeNodes = (fields) => `
  edges {
    node{
      ${fields}    
    }
    cursor
  }  
  `;
exports.edgeNodes = edgeNodes;
//# sourceMappingURL=graphql-fragments.js.map