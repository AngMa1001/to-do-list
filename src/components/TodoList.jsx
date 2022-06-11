import React, {useState, useEffect} from "react";
import { Filter } from "../util/Filter";

export default function TodoList(props){
    const [todoList , setTodoList] = useState([]);
    const [active ,setActive] = useState(true);
    const [emptyCheck, setEmptyCheck] = useState(true)
    useEffect(()=>{
        if(props.todos === null|| props.todos === undefined ||props.todos.length < 1){
            setTodoList([]);
            setEmptyCheck(true);
            activeCheck(props.todos);
        }else{
            setTodoList(Filter(props.todos, props.type))
            activeCheck(props.todos);
            setEmptyCheck(false);
        }
    }, [props.type, props.todos])

    function activeCheck(props){
        let count = 0;
        props.map(todo => {
            if(todo.completed){
                count++;
            }
            return count
        })
        if(count === props.length){
            setActive(true);
        }else{
            setActive(false);
        }
    }

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
            <div className={"toggle-all " + (emptyCheck ? "emptyCheck " : " ") }>
                <input onClick={toggleAll} id="toggle-all" type="checkbox" />
                <label htmlFor="toggle-all" className={active ? "focused " : " "}></label>
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
                        <li className= {"list-content " + (todo.completed ? "complete-checkbox":" ")}>{todo.content}</li>
                        <li onClick={()=>{
                            handleDelete(todo._id);
                            }} 
                            className="delete-btn"></li>
                    </div>
                )   
            })}
        </div>
    )
}