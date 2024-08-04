import React from "react"

export default function Form(){
    const [formData, setFormData] = React.useState({
        expense:"",
        category:"",
        notes:"",
        date:""
    })

   

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
         console.log(formData)
    }

    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="expense">Expense</label>
            <input type="number"
                    id="expense"
                    name="expense"
                    value={formData.expense}
                    onChange={handleChange} />
            <br />

            <label htmlFor="category">Category</label>
            <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}>
                <option value="transportation">Transportation</option>
                <option value="restaurants">Restaurants</option>
            </select>
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
            <br/>

            <button>Submit</button>

        </form>
    )
}