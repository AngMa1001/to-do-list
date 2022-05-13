import React, {useState, useEffect} from "react";
import { Filter } from "../util/Filter";

export default function TodoList(props){
    const [todoList , setTodoList] = useState([]);
    
    useEffect(()=>{
        if(props.todos === null|| props.todos === undefined ||props.todos.length < 1){
            setTodoList([]);
        }else{
            setTodoList(Filter(props.todos, props.type))
        }
    }, [props.type, props.todos])
    function handleChange(e){
        setTodoList(prevList=>{
            prevList.completed = !prevList.completed
            return Filter(props.todos, props.type)
        });
    }

    function handleDelete(id){
        props.onDelete(id);
    }
    function handleComplete(id){
        props.onComplete(id);
    }

    function toggleAll(){
        props.onToggleAll();
    }
    return(
        <div className="todo-list-wrapper">
            <div className="toggle-all">
                <input onClick={toggleAll} id="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all"></label>
            </div>
            {todoList && todoList.map((todo) =>{
                return todo && (    
                    <div className="list-view" key={todo._id}>
                        <div className="todo-checkbox">
                            <input 
                            onClick={()=>{
                                handleComplete(todo._id);
                            }} 
                            onChange={handleChange} 
                            checked={todo.completed} 
                            type="checkbox" 
                            id={todo._id}/>
                            <label htmlFor={todo._id}></label>
                        </div>
                        <li className={todo.completed ? "complete-checkbox":" " }>{todo.content}</li>
                        <img onClick={()=>{
                            handleDelete(todo._id);
                        }} src="./img/delete_icon.png" alt="delete" className="delete-btn"/>
                    </div>
                )   
            })}
        </div>
    )
}
