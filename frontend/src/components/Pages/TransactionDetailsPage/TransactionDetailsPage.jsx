import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {deleteTransactionAPI, getTransactionAPI} from "../../../services/TransactionsService";
import "./TransactionDetailsPage.css";
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import EditTransactionModal from "../../EditTransactionModal/EditTransactionModal";

function TransactionDetailsPage() {

    // Getting the transaction

    const params = useParams();
    const id = parseInt(params.id);

    const [transaction,setTransaction] = useState(null);

    useEffect(() => {

        getTransactionAPI(id).then(result => {

            if(result === undefined){
                return;
            }

            setTransaction(result);
        });
    }, []);


    // For redirecting after deleting/editing
    const navigate = useNavigate();

    // Delete Modal

    const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);

    function openDeleteModal(){
        setIsDeleteModalOpen(true);
    }

    function closeDeleteModal(){
        setIsDeleteModalOpen(false);
    }

    async function submitDeleteModal(){
        const result = await deleteTransactionAPI(id);

        if(result === undefined){
            return;
        }

        navigate("/transactions");
    }

    // Edit Modal

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    function openUpdateModal(){
        setIsUpdateModalOpen(true);
    }

    function closeUpdateModal(){
        setIsUpdateModalOpen(false);
    }

    function submitUpdateModal(){
        navigate("/transactions");
    }

    return (
        <main className="page-container">
            {transaction &&
            <div className="transaction-details-container">

                    <p>{transaction.name}</p>
                    <p>{transaction.date}</p>
                    <p>{transaction.categoryName}</p>
                    <p>{transaction.amount}</p>
                    <p>{transaction.description}</p>


                <div>
                    <button className="primary-button" onClick={openUpdateModal}>
                        Edit
                    </button>

                    <button className="secondary-button" onClick={openDeleteModal}>
                        Delete
                    </button>
                </div>

                <ConfirmationModal
                    isModalOpen={isDeleteModalOpen}
                    handleClosing={closeDeleteModal}
                    handleSubmit={submitDeleteModal}
                />

                <EditTransactionModal
                    isModalOpen={isUpdateModalOpen}
                    closeModal={closeUpdateModal}
                    handleSubmit={submitUpdateModal}
                    transaction={transaction}
                />
            </div>

            }
        </main>
    );
}

export default TransactionDetailsPage;