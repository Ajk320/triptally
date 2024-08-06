import React from 'react'
import Form from './Form'

export default function Modal({open}){
    console.log(!open)
    if(!open) return null;


    return(
        <div>
            <Form/>
        </div>
    )
}