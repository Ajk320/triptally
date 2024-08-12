import React from "react";


export default function ExpenseList() {
    
    const [items, setItems] = React.useState([]);
    const [categories, setCategories] = React.useState({});
    const [editingId, setEditingId] = React.useState(null);
    const [editingForm, setEditingForm] = React.useState({
        amount: "",
        expense_type_id: "",
        description: "",
        date: ""
    });

    React.useEffect(() => {
        const fetchExpenses = fetch(`http://localhost:8000/expenses`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                return response.json();
            });

        const fetchCategories = fetch(`http://localhost:8000/expense_types`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            });

        
        Promise.all([fetchExpenses, fetchCategories])
            .then(([expensesData, categoriesData]) => {
                const categoryMap = {};
                categoriesData.forEach(item => {
                    categoryMap[item.id] = item.name;
                });

                setCategories(categoryMap);
                setItems(expensesData);
            })
            .catch(error => console.error(error));
    }, []);
    function handleDelete(id) {
        const apiUrl = `http://localhost:8000/expenses/${id}`;
        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
            } else {
                console.error("Failed to delete");
            }
        })
        .catch(error => console.error(error));
    }
    function handleEdit(id){
        setEditingId(id);
        const item = items.find(i=> i.id === id);
        setEditingForm({
            amount: item.amount,
            expense_type_id : item.expense_type_id,
            description : item.description,
            date : item.date
        });
    }
    function handleChange(event){
        const{name, value} = event.target;
        setEditingForm(prevForm => ({
            ...prevForm,
            [name]: value
            }));
    }
    function handleUpdate(event){
        event.preventDefault();
        const apiUrl = `http://localhost:8000/expenses/${editingId}`
        fetch(apiUrl,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingForm)
        })
        .then(response=>{
            if(response.ok){
                setItems(prevItems=>{
                    return prevItems.map(item => item.id == editingId ? {...item, ...editingForm}: item)
                })
                setEditingId(null);
        }
        else{
            console.error("Failed to update");
        }
    })
        .catch(error=>console.error(error));
    
    }

    return (
        <>
            <h2>Expense List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {editingId === item.id ? (
                            <form onSubmit={handleUpdate}>
                                <label>
                                    Expense:
                                    <input
                                        type="number"
                                        name="amount"
                                        value={editingForm.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <br />  
                                <label>
                                    Category:
                                    <select
                                        name="expense_type_id"
                                        value={editingForm.expense_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        {Object.entries(categories).map(([id, name]) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <br />
                                <label>
                                    Notes:
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingForm.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <br />
                                <label>
                                    Date:
                                    <input
                                        type="date"
                                        name="date"
                                        value={editingForm.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <br />
                                <button type="submit">Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <strong>Expense:</strong> {item.amount} <br />
                                <strong>Category:</strong> {categories[item.expense_type_id]} <br />
                                <strong>Notes:</strong> {item.description} <br />
                                <strong>Date:</strong> {item.date} <br />
                                <button onClick={() => handleEdit(item.id)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}