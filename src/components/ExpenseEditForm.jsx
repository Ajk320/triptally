import React from "react";
export default function({handleUpdate, editingForm, handleChange, categories, setEditingId}){
    return(
        <>
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
        </>
    )
}