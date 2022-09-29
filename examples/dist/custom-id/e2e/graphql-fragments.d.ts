export declare const todoItemFields = "\n    id\n    title\n    completed\n    description\n  ";
export declare const subTaskFields = "\nid\ntitle\ndescription\ncompleted\ntodoItemId\n";
export declare const tagFields = "\nid\nname\n";
export declare const pageInfoField = "\npageInfo{\n  hasNextPage\n  hasPreviousPage\n  startCursor\n  endCursor\n}\n";
export declare const edgeNodes: (fields: string) => string;
