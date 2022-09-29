"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeNodes = exports.pageInfoField = exports.userFields = void 0;
exports.userFields = `
    id
    name
    email
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