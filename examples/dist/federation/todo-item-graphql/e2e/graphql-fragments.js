"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeNodes = exports.pageInfoField = exports.todoItemFields = void 0;
exports.todoItemFields = `
    id
    title
    completed
    description
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