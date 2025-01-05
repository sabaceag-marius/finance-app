import React, {useState} from 'react';
import {useAuth} from "../../../context/AuthContext";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";

function UserPage() {

    const {user,deleteUser} = useAuth();

    // section Delete Account Modal

    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);


    function openDeleteModal(){
        setIsDeleteModalOpen(true);
    }

    function closeDeleteModal(){
        setIsDeleteModalOpen(false);
    }

    async function submitDeleteModal(){
        deleteUser();
    }

    return (
        <div>

            <h1>Hello, {user.username}</h1>

            <button
                className="secondary-button"
                onClick={openDeleteModal}>
                Delete Account
            </button>

            <ConfirmationModal isModalOpen={isDeleteModalOpen} handleClosing={closeDeleteModal} handleSubmit={submitDeleteModal} />
        </div>
    );
}

export default UserPage;