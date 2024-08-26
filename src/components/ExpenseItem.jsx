import React from "react";
export default function({item, categories, onEdit, onDelete}){
    return (
        <>
            <strong>$</strong>{item.amount} <br />
            <strong>Category:</strong> {categories[item.expense_type_id]} <br />
            <strong>Notes:</strong> {item.description} <br/>
            <strong>Date:</strong> {item.date} <br />
            <button onClick={() => onEdit(item.id)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
        </>
    )
}