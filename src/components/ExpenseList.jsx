import React from "react"
import Navbar from "./Navbar";
export default function ExpenseList(){
    const[items, setItems] = React.useState([]);

    React.useEffect(()=>{
        const savedItems = JSON.parse(localStorage.getItem("items"));
        if(savedItems){
            setItems(savedItems);
        }
    },[]);

    return(
        <>
            <Navbar/>
            <h2>Expense List</h2>
            <ul>
                {items.map((item, index) =>(
                    <li key={index}>
                        <strong>Expense:</strong> {item.expense} <br/>
                        <strong>Category:</strong> {item.category} <br/>
                        <strong>Notes:</strong> {item.notes} <br/>
                        <strong>Date:</strong> {item.date} <br/>
                        <button onClick={()=>handleEdit(index)}>Edit</button>
                        <button onClick={()=>handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}