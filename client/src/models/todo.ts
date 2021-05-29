class Todo {
    id: string;
    task: string;
    priority: Priority;
    createdDate: Date;

    constructor(task: string, priority: Priority) {
        this.task        = task;
        this.priority    = priority;
        this.createdDate = new Date();
        this.id          = this.createdDate.toISOString();
    }
}

export enum Priority {
    Low    = "LOW",
    Medium = "MEDIUM",
    High   = "HIGH"
}

export default Todo;
