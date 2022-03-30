import React, {useState} from "react";


export default function List(props){

    function handleClick(){
        props.onDelete(props.id);
    }
    return(
        <div className="list-view">
            <li key={props.id}>{props.content} </li>
            <button onClick={handleClick}>X</button>
        </div>
    )
}