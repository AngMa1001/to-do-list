export function Filter(todos, type) {
    const todoList = [];
    switch (type) {
        case "active":
            for (let i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    todoList.push(todos[i]);
                }
            }
            break;
        case "completed":
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    todoList.push(todos[i]);
                }
            }
            break;
        default:
            for (let i = 0; i < todos.length; i++) {
                todoList.push(todos[i]);
            }
            break;
    }

    return todoList;
}
