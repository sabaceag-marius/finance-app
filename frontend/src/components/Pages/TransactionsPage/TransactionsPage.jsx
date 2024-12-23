import React, {useState, useEffect} from "react";
import './Transactions.css';
import CreateTransactionModal from "../../CreateTransactionModal/CreateTransactionModal";
import { apiCall } from "./example";
import TransactionCard from "../../TransactionCard/TransactionCard";
import FilterForm from "../../FilterForm/FilterForm";
import {useAuth} from "../../../context/AuthContext";
import {getTransactionsAPI} from "../../../services/TransactionsService";
function Transactions(){

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal(){
        setIsModalOpen(true)
    }

    function closeModal(){
        setIsModalOpen(false)
    }


    const [queryData, setQueryData] = useState({
        categories: "",
        minValue: "",
        maxValue: "",
        searchQuery: ""
    })

    function onChangeQuery(event){

        const {name,value} = event.target

        setQueryData(prev => ({
            ...prev,
            [name] : value
        }))

    }

    async function onSubmit(event){
        event.preventDefault();
        await fetchData();
    }

    function resetFilters(){
        setQueryData(prev => {

            return {
                categories: "",
                minValue: "",
                maxValue: "",
                searchQuery: prev.searchQuery
            }
        });

        fetchData().catch(error => console.log(error));
    }

    async function fetchData(){

        setTransactions(await getTransactionsAPI(queryData));

    }

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);


    const  transactionComponents = transactions.map( transaction =>
        <TransactionCard key={transaction.id} transaction={transaction} />);

    return(
        <div className="transactions-container">
            
            <div className="top-section">

                <h2>Transactions</h2>

                <div className="top-section-inputs">
                    <div className="search-bar">
                        <input type="text"
                            name="searchQuery"
                            onChange={onChangeQuery}
                            value={queryData.searchQuery}
                        />
                        <button>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>

                    <button onClick={openModal}>+ Add</button>
                </div>
            </div>

            <main>

                <div className="filter-section">
                    <h3>Filter</h3>
                    <FilterForm
                        handleChange = {onChangeQuery}
                        handleSubmit = {onSubmit}
                        handleReset = {resetFilters}
                        stateData = {queryData}
                    />
                </div>

                <div className="transactions-section">
                    
                    <h3>Transactions</h3>
                    
                    <div className="transactions-container">
                        {
                            transactionComponents.length === 0 ?
                                <h3>There are no transactions</h3>
                                :
                            transactionComponents
                        }

                    </div>
                </div>
            </main>

            <CreateTransactionModal isModalOpen={isModalOpen} closeModal={closeModal} onSubmit={fetchData} />
        </div>
    )

}

export default Transactions;
