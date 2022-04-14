import React, {useState, useEffect} from "react";
import { Filter } from "../util/Filter";

export default function TodoList(props){
    const [todoList , setTodoList] = useState([]);

    useEffect(()=>{
        setTodoList(Filter(props.todos, props.type))
        
    }, [props.type, props.todos])

    function handleChange(e){
        setTodoList(prevList=>{
            console.log(prevList.length);
            props.todos.completed = !props.todos.completed
            return Filter(props.todos, props.type)
        });
    }

    function handleDelete(id){
        props.onDelete(id);
    }

    function handleComplete(id){
        
        props.onComplete(id);
    }

    return(
        <div>
            {todoList && todoList.map((todo) =>{
                return todo && (    
                    <div className="list-view" key={todo._id}>
                        <input 
                        onClick={()=>{
                            handleComplete(todo._id);
                        }} 
                        onChange={handleChange} 
                        checked={todo.completed} 
                        type="checkbox" 
                        className="check-box" 
                        />
                        <li className={todo.completed ? "complete-checkbox":" " }>{todo.content}</li>
                        <button onClick={()=>{
                            handleDelete(todo._id);
                        }}>X</button>
                    </div>
                )   
            })}
            
        </div>
    )
}

// {filteredList && filteredList.map((todos) =>{
//     return todos && (    )   
//             })}