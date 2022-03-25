
export function getTodoList() {
    return JSON.parse(localStorage.getItem("todoList"));
}

export function saveTodoList(todos) {
    localStorage.setItem("todoList", JSON.stringify(todos));
}