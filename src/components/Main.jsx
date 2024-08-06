import React from "react"
import Modal from "./Modal"

export default function Main(){
    const [isOpen, setIsOpen] = React.useState(false)
    function toggleModal(){
        setIsOpen(!isOpen)
    }
    // console.log(isOpen)

    return(
        <div className="main-content">
            <h1>Enter your first expense</h1>
            <button className="add-expense-button"
                    onClick={toggleModal}>+</button>
            <Modal open={isOpen}/>
        </div>
    )
}