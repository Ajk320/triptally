import React from 'react'
import Form from './Form'

export default function Modal({open}){
    console.log(!open)
    if(!open) return null;


    return(
        <div>
            <div className='overlay'>
                <Form/>
            </div>
        </div>
    )
}