import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"

export default function ListSelector(props){
    return(
        <div className="footer-selector filters" >
          <li ><Link to={"/"} className={props.type === "all" ? "list-selected" : " "}>All</Link></li>
          <li ><Link to={"/active"} className={props.type === "active" ? "list-selected" : " "}>Active</Link></li>
          <li ><Link to={"/completed"} className={props.type === "completed" ? "list-selected" : " "}>Completed</Link></li>
        </div>
    )
}