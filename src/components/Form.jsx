import React from "react"

export default function Form(){
    const [formData, setFormData] = React.useState({
        expense:"",
        category:"",
        notes:"",
        date:""
    });

    const [errors, setErrors] = React.useState({});

    const[items, setItems] = React.useState([]);

    React.useEffect(()=>{
        //load item into local when component mounts
        const savedItems = JSON.parse(localStorage.getItem('items'));
        if(items){
            setItems(items)
        }
    }, []);

    React.useEffect(()=>{
        //update local with new item when item changes
        localStorage.setItem('items', JSON.stringify(items))
    }, [items]);



   

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
        setItems(prevItems=>[...prevItems, formData])
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
            <button>Submit</button>

        </form>
    )
}