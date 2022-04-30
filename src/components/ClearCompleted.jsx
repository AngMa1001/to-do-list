import React from "react";

export default function ClearCompleted(props){
  function clearAll(){
    props.onDelete();
  }
    return(
        <div className="list-selector">
          <li onClick={clearAll}>Clear completed</li>
        </div>
    )
}
