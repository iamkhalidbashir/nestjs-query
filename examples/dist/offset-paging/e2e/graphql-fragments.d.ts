export declare const todoItemFields = "\n    id\n    title\n    completed\n    description\n  ";
export declare const subTaskFields = "\nid\ntitle\ndescription\ncompleted\ntodoItemId\n";
export declare const tagFields = "\nid\nname\n";
export declare const pageInfoField = "\npageInfo{\n  hasNextPage\n  hasPreviousPage\n}\n";
export declare const nodes: (fields: string) => string;
export declare const offsetConnection: (fields: string) => string;
