import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";

export default function Main(){
    const navigate = useNavigate();
    const handleButtonClick = ()=>{
        navigate("/form")
    };
        return(
        <>
            <Navbar/>
            <div className="main-content">
                <h1>Enter your first expense</h1>
                <button className="add-expense-button"
                        onClick={handleButtonClick}>+</button>
            </div>
        </>
    )
}