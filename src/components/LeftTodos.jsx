import React, {useState, useEffect} from "react";

export default function LeftTodos(props){
  return(
      <div className="list-selector">
        <li>{props.leftCount} todos left </li>
      </div>
  )
}
