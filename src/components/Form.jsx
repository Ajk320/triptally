import React from "react"
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Form(){
    const [formData, setFormData] = React.useState({
        expense:"",
        category:"",
        notes:"",
        date:""
    });

    const [errors, setErrors] = React.useState({});

    const[items, setItems] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(()=>{
        //load item into local when component mounts
        const savedItems = JSON.parse(localStorage.getItem('items'));
        if(savedItems){
            setItems(savedItems)
        }
    }, []);


   

    function handleChange(event){
        const{name, value} = event.target
        setFormData(prevFormData=>{
            return{
                ...prevFormData,
                [name] : value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()

        setErrors(validateForm(formData))
        console.log(formData)
        const newItems = [...items, formData]
        setItems(newItems)
        localStorage.setItem('items', JSON.stringify(newItems));
        navigate("/expenses")

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
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="expense">Expense</label>
                <input type="number"
                        id="expense"
                        name="expense"
                        value={formData.expense}
                        onChange={handleChange} />
                <div>{errors.expense}</div>
                <br />

                <label htmlFor="category">Category</label>
                <select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}>
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
                    value={formData.notes}
                    onChange={handleChange}></textarea>
                <br/>

                <label htmlFor="date">Date</label>
                <input 
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}/>
                <div>{errors.date}</div>            
                <br/>
                <button className="form--submit">Submit</button>

            </form>
        </>
    )
}