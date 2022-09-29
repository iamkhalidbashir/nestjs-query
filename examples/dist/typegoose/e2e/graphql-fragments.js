"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subTaskAggregateFields = exports.tagAggregateFields = exports.todoItemAggregateFields = exports.edgeNodes = exports.pageInfoField = exports.tagFields = exports.subTaskFields = exports.todoItemFields = void 0;
exports.todoItemFields = `
    id
    title
    completed
    description
    age
  `;
exports.subTaskFields = `
id
title
description
completed
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
exports.todoItemAggregateFields = `
count {
  id
  title
  description
  completed
  createdAt
  updatedAt
}
min {
  id
  title
  description
}
max {
  id
  title
  description
}    
`;
exports.tagAggregateFields = `
count {
  id
  name
  createdAt
  updatedAt
}
min {
  id
  name
}
max {
  id
  name
}
`;
exports.subTaskAggregateFields = `
count {
  id
  title
  description
  completed
}
min {
  id
  title
  description      
}
max {
  id
  title
  description    
}
`;
//# sourceMappingURL=graphql-fragments.js.map