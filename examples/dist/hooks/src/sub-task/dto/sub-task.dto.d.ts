export declare class SubTaskDTO {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created: Date;
    updated: Date;
    todoItemId: string;
    createdBy?: string;
    updatedBy?: string;
}
