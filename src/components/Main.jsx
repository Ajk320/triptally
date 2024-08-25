import React from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar";
import ExpenseList from "./ExpenseList";

export default function Main(){
    const navigate = useNavigate();
    const handleButtonClick = ()=>{
        navigate("/form")
    };
        return(
        <div className="main">
            <Navbar/>
            <div className="main-content">
                <ExpenseList/> 
                <div className="add-expense-button-class">
                    <button className="add-expense-button"
                            onClick={handleButtonClick}>+</button>
                </div>
            </div>
        </div>
    )
}