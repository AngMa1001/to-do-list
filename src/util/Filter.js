export function Filter(todos, type) {
    const todoList = [];
    switch (type) {
        case "active":
            console.log("active filter triggered");
            for (let i = 0; i < todos.length; i++) {
                if (!todos[i].completed) {
                    todoList.push(todos[i]);
                }
            }
            break;
        case "completed":
            console.log("completed filter triggered");
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].completed) {
                    todoList.push(todos[i]);
                }
            }
            break;
        default:
            console.log("All filter triggered");
            for (let i = 0; i < todos.length; i++) {
                todoList.push(todos[i]);
            }
            break;
    }

    return todoList;
}
