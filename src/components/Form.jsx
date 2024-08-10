import React from "react"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"

export default function Form(){
    const [formData, setFormData] = React.useState({
        expense:"",
        category:"",
        notes:"",
        date:""
    });

    const [errors, setErrors] = React.useState({});

    const navigate = useNavigate();

    const[items, setItems] = React.useState([]);

    

    // React.useEffect(()=>{
    //     // const savedItems = JSON.parse(localStorage.getItem('items'));
    //     // if(savedItems){
    //     //     setItems(savedItems)
    //     // }
    //     const apiUrl = `http://localhost:8000/expenses`
    //     fetch(apiUrl,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => setItems(data))
        
    // }, []);


   

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
        event.preventDefault();
        const formErrors = validateForm(formData);
        setErrors(formErrors);

        if(Object.keys(formErrors).length=== 0){
            let UUID = "";
            const apiUrl1 = `http://localhost:8000/expense_types`;
            const requestBody2 = {  
                "name" : formData.category
            }
            fetch(apiUrl1,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody2)
            })
            .then(response => response.json())
            .then(data =>{
                UUID = data.id;
                const apiUrl = `http://localhost:8000/expenses`
                const requestBody = {
                "amount": formData.expense,
                "date": formData.date,
                "description": formData.notes,
                "expense_type_id": UUID
            };
            return fetch(apiUrl,{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            })

            .then(response=> response.json())
            .then(newItem=>{
                setItems(prevItem => [...prevItem, newItem]);
                navigate("/")
            })
            .catch(error=>console.error(error));
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


// if(Object.keys(formErrors).length=== 0){
//     const apiUrl = `http://localhost:8000/api/expenses`
//     const requestBody = {
//         expense : formData.expense,
//         category : formData.category,
//         notes : formData.notes,
//         date : formData.date
//     };
//     fetch(apiUrl,{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//     })
//     .then(response=> response.json())
//     .then(newItem=>{
//         setItems(prevItem => [...prevItem, newItem]);
//         navigate("/")
//     })
//     .catch(error=>console.error(error));
// }