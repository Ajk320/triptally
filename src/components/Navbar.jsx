import React from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar(){
    const navigate = useNavigate();
    return(
        <nav>
            <h3 className="nav--title" onClick={()=>navigate("/")}>TripTally</h3>
            <h3 className="nav--expense" onClick={()=>navigate("/expenses")}>Expenses</h3>
        </nav>
    )
}