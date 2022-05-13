import React from "react";

export default function LeftTodos(props){
  return(
      <div className="footer-selector">
        <li>{props.leftCount} todos left </li>
      </div>
  )
}
