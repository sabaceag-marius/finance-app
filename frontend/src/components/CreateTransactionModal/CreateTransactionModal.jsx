import React, {useState, useEffect} from "react";
import Modal from 'react-modal'
import './CreateTransactionModal.css';
import {addTransactionAPI} from "../../services/TransactionsService";


function CreateTransactionModal({isModalOpen,closeModal,handleSubmit}){

    const DEFAULT_FORM_DATA = {
        name : "",
        categoryName: "",
        description: "",
        value: "",
        date: new Date().toISOString().split('T')[0]
    };

    const [formData,setFormData] = useState(DEFAULT_FORM_DATA);
    
    function handleFormChange(event){
        const {name,value} = event.target

        setFormData(prev =>({
            ...prev,
            [name]:value
        }))
        
    }

    async function onSubmit(event){
        
        event.preventDefault();

        const result = await addTransactionAPI(formData);

        setFormData(DEFAULT_FORM_DATA);

        if(result === undefined){
            return;
        }

        handleSubmit();
        closeModal();

    }

    function onClose(){
        
        //Reset form data
        setFormData(DEFAULT_FORM_DATA);

        closeModal();
    }

    const styling = {
        // overlay:{
        //     background: "transparent"
        // },
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
            isOpen={isModalOpen}
            onRequestClose={onClose}
            preventScroll={false}
            style={styling}
        >
            <div className="form--card">
            
            <div className="form-header">
                <h2 className="form-header-title">Add transaction</h2>
                <button 
                    className="form-header-button material-symbols-outlined"
                    onClick={onClose}>close
                </button>
            </div>

            <form className="transaction-modal" onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
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

                <label htmlFor="value">Amount</label>
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
       
            </div>
        </Modal>
    )
}

export default CreateTransactionModal;