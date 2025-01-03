import React from 'react';
import Modal from "react-modal";

function ConfirmationModal({isModalOpen,handleClosing,handleSubmit}) {

    var styling = {
        overlay:{
            background: "transparent"
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

    function onSubmit(){
        handleSubmit();
        handleClosing();
    }

    return (
        <Modal
            style={styling}
            isOpen={isModalOpen}
            onRequestClose={handleClosing}
            preventScroll={false}
        >
            <div className="form--card">
                <h2>Question?</h2>
                <p>Describe consequence.</p>

                <button className="primary-button" onClick={handleClosing}>Cancel</button>
                <button className="secondary-button" onClick={onSubmit}>Confirm</button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;