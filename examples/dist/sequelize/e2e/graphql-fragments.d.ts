export declare const todoItemFields = "\n    id\n    title\n    completed\n    description\n    age\n  ";
export declare const subTaskFields = "\nid\ntitle\ndescription\ncompleted\ntodoItemId\n";
export declare const tagFields = "\nid\nname\n";
export declare const pageInfoField = "\npageInfo{\n  hasNextPage\n  hasPreviousPage\n  startCursor\n  endCursor\n}\n";
export declare const edgeNodes: (fields: string) => string;
export declare const todoItemAggregateFields = "\ncount {\n  id\n  title\n  description\n  completed\n  created\n  updated\n}\nsum {\n  id\n}\navg {\n  id\n}\nmin {\n  id\n  title\n  description\n}\nmax {\n  id\n  title\n  description\n}    \n";
export declare const tagAggregateFields = "\ncount {\n  id\n  name\n  created\n  updated\n}\nsum {\n  id\n}\navg {\n  id\n}\nmin {\n  id\n  name\n}\nmax {\n  id\n  name\n}\n";
export declare const subTaskAggregateFields = "\ncount {\n  id\n  title\n  description\n  completed\n  todoItemId\n}\nsum {\n  id      \n}\navg {\n  id\n}\nmin {\n  id\n  title\n  description      \n  todoItemId\n}\nmax {\n  id\n  title\n  description    \n  todoItemId\n}\n";
