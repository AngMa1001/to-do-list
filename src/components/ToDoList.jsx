import React , {useState} from "react";
import TodoList, { getTodoList, saveTodoList } from "../util/TodoList";


export default function ToDoList(props){
    const [todos, setTodos] = useState({
        content : ""
    });

    function handleAdd(event){
        if(event.code === "Enter"){
            props.onAdd(todos);
            setTodos({
                content : ""
            })
        }else{
            console.log("not an enter");
        }
        // console.log(props.onAdd());
        // if(event.code === "Enter"){
        //     setTodoList(previousTodos => {
        //         return [...previousTodos, todos];
        //     });
        //     console.log(todoList);
        // }else{
        //     console.log("not an enter");
        // }
    }

    function handleKeyDown(event){
        setTodos({
            content : event.target.value
        });
    }
    return(        
        <input 
        type="text"  
        className="todo-input" 
        autoComplete="off"
        value={todos.content}
        onChange={handleKeyDown}
        onKeyDown={handleAdd}
        />
    )
}