import React from "react"
import { useNavigate } from 'react-router-dom';

export default function ExpenseList(){
    const navigate = useNavigate();
    const[items, setItems] = React.useState([]);
    const[editingIndex, setEditingIndex] = React.useState(null);
    const[editingItem, setEditingitem] = React.useState({expense:"", category:"", notes:"", date:""});
    const [errors, setErrors] = React.useState({});

    React.useEffect(()=>{
        // const savedItems = JSON.parse(localStorage.getItem("items"));
        // if(savedItems){
        //     setItems(savedItems);
        // }
        const apiUrl = `http://localhost:8000/expenses`
        fetch(apiUrl,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => setItems(data))
    },[]);

    function handleDelete(index){
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        localStorage.setItem("items",JSON.stringify(newItems));
    }
    function handleEdit(index){
        setEditingIndex(index);
        setEditingitem(items[index]);
    }

    function handleEditChange(event){
        const{name, value} = event.target;
        setEditingitem(prevFormData=>{
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }   
    function handleEditSubmit(event){
        event.preventDefault();
        const formErrors = validateForm(editingItem);
        setErrors(formErrors);
        if(Object.keys(formErrors).length=== 0){
            const newItems = [...items];
            newItems[editingIndex] = editingItem;
            setItems(newItems);
            localStorage.setItem('items', JSON.stringify(newItems));
            setEditingIndex(null)
            navigate("/");
        }

    }

    function validateForm(data){
        const errors = {};

        if(!data.expense.trim()){
            errors.expense = "Expense is required";
        }
        
        if(!data.category.trim()){
            errors.category = "Select a category";
        }

        if(!data.date.trim()){
            errors.date = "Date is required";
        }

        return errors;
    }
    

    return(
        <>
            <h2>Expense List</h2>
            {editingIndex!== null?(
                <form onSubmit={handleEditSubmit}>
                    <label htmlFor="expense">Expense</label>
                    <input type="number"
                            id="expense"
                            name="expense"
                            value={editingItem.expense}
                            onChange={handleEditChange} />
                    <div>{errors.expense}</div>
                    <br />

                    <label htmlFor="category">Category</label>
                    <select 
                        id="category"
                        name="category"
                        value={editingItem.category}
                        onChange={handleEditChange}>
                        <option value="">Choose option</option>
                        <option value="transportation">Transportation</option>
                        <option value="restaurants">Restaurants</option>
                    </select>
                    <div>{errors.category}</div>
                    <br/>

                    <label htmlFor="notes">Notes</label>
                    <textarea 
                        id="notes" 
                        name="notes"
                        value={editingItem.notes}
                        onChange={handleEditChange}></textarea>
                    <br/>

                    <label htmlFor="date">Date</label>
                    <input 
                        type="date"
                        id="date"
                        name="date"
                        value={editingItem.date}
                        onChange={handleEditChange}/>
                    <div>{errors.date}</div>            
                    <br/>
                    <button className="form--submit">Submit</button>

                </form>
            ):(
                <ul>
                {items.map((item, index) =>(
                    <li key={index}>
                        <strong>Expense:</strong> {item.amount} <br/>
                        <strong>Category:</strong> {item.expense_type_id} <br/>
                        <strong>Notes:</strong> {item.description} <br/>
                        <strong>Date:</strong> {item.date} <br/>
                        <button onClick={()=>handleEdit(index)}>Edit</button>
                        <button onClick={()=>handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            )}
        </>
    )
}

// fetch("http://localhost:8000/expenses", {
//     "headers": {
//       "accept": "application/json",
//       "accept-language": "en-US,en",
//       "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"Windows\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "sec-gpc": "1"
//     },
//     "referrer": "http://localhost:8000/docs",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET",
//     "mode": "cors",
//     "credentials": "omit"
//   });