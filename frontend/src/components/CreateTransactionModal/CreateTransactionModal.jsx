import React, {useState, useEffect} from "react";
import Modal from 'react-modal'
import './CreateTransactionModal.css';
import {addTransactionAPI} from "../../services/TransactionsService";


function CreateTransactionModal(props){

    const [validationError, setValidationError] = useState({
        exists: false,
        message: "Incorrect username/password"
    })

    const [formData,setFormData] = useState({
        name : "",
        categoryName: "",
        description: "",
        value: "",
        date: new Date().toISOString().split('T')[0]
    })
    
    function handleFormChange(event){
        const {name,value} = event.target

        setFormData(prev =>({
            ...prev,
            [name]:value
        }))
        
    }

    async function handleSubmit(event){
        
        event.preventDefault();
        console.log(formData);

        const error = await addTransactionAPI(formData);

        if(error) return;

        props.onSubmit();
        props.closeModal();
    }

    function close(event){
        
        //Reset form data
        setFormData(({
            name : "",
            categoryName: "",
            description: "",
            value: "",
            date: new Date().toISOString().split('T')[0]
        }))

        props.closeModal();
    }

    var styling = {
        overlay:{
            // background: "transparent"
        },
        content:{

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            overflow: "default",
            background: "transparent"
        }
    }
    return(

        <Modal
            isOpen={props.isModalOpen}
            onRequestClose={close}
            preventScroll={false}
            style={styling}
        >
            <div className="form--card">
            
            <div className="form-header">
                <h2 className="form-header-title">Add transaction</h2>
                <button 
                    className="form-header-button"
                    onClick={close}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <form className="transaction-modal" onSubmit={handleSubmit}>
                <label htmlFor="name">Title</label>
                <input 
                    className="modal--input"
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleFormChange}
                    value={formData.name}

                />

                <label htmlFor="categoryName">Category Name</label>
                <input 
                    className="modal--input"
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    onChange={handleFormChange}
                    value={formData.categoryName}

                />
               
               <label htmlFor="description">Description</label>
                <input 
                    className="modal--input"
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleFormChange}
                    value={formData.description}
                />

                <label htmlFor="value">Value</label>
                <input 
                    className="modal--input"
                    type="number"
                    step="0.01"
                    id="value"
                    name="value"
                    onChange={handleFormChange}
                    value={formData.value}
                    
                />

                <label htmlFor="date">Date</label>
                <input type="date"
                    className="modal--input"
                    id="date"
                    name="date"
                    onChange={handleFormChange}
                    value={formData.date} />
                <button className="submit-button">Submit</button>
            </form>

            <p className="error">{validationError.exists ? validationError.message : ' '}</p>
       
            </div>
        </Modal>
    )
}

export default CreateTransactionModal;