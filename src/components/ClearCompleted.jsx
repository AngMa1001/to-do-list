import React from "react";

export default function ClearCompleted(props){
  function clearAll(){
    props.onDelete();
  }
    return(
        <div className="footer-selector">
          <li onClick={clearAll}>Clear completed</li>
        </div>
    )
}
