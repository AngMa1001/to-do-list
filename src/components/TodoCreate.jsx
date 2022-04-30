import React , {useState} from "react";



export default function TodoCreate(props){
    const [todos, setTodos] = useState({
        content : ""
    });

    function handleAdd(event){
        if(event.code === "Enter"){
            if(!todos.content.length < 1){
                props.onAdd(todos);
                setTodos({
                    content : ""
                })
            }
        }else{
            console.log("not an enter");
        }
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
        placeholder="What needs to be done?"
        autoComplete="off"
        value={todos.content}
        onChange={handleKeyDown}
        onKeyDown={handleAdd}
        />
    )
}