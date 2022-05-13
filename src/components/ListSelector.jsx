import React from "react";
import {Link} from "react-router-dom"

export default function ListSelector(props){
    return(
        <div className="footer-selector">
          <li><Link to={"/"}>All</Link></li>
          <li><Link to={"/active"}>Active</Link></li>
          <li><Link to={"/completed"}>Completed</Link></li>
        </div>
    )
}
