import React, {useState} from 'react';
import Modal from "react-modal";
import {addTransactionAPI, updateTransactionAPI} from "../../services/TransactionsService";

function EditTransactionModal({isModalOpen,handleClosing,handleSubmit,transaction}) {

    const styling = {
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

    const [formData,setFormData] = useState({
        name : transaction.name,
        categoryName: transaction.categoryName,
        description: transaction.description,
        value: transaction.value,
        date: transaction.date
    })

    function handleFormChange(event){
        const {name,value} = event.target

        setFormData(prev =>({
            ...prev,
            [name]:value
        }))
    }

    function closeModal(){
        setFormData({
            name : transaction.name,
            categoryName: transaction.categoryName,
            description: transaction.description,
            value: transaction.value,
            date: transaction.date
        });
        handleClosing();
    }

    async function onSubmit(event){

        event.preventDefault();

        const error = await updateTransactionAPI(transaction.id,formData);

        if(error) return;

        handleSubmit();
        closeModal();
    }

    return (
        <Modal
            style={styling}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            preventScroll={false}
        >
            <div className="form--card">

                <div className="form-header">
                    <h2 className="form-header-title">Add transaction</h2>
                    <button
                        className="form-header-button"
                        onClick={closeModal}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form className="transaction-modal" onSubmit={onSubmit}>
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
                           value={formData.date}/>
                    <button className="submit-button">Submit</button>
                </form>

            </div>
        </Modal>
    );
}

export default EditTransactionModal;