import React, {useState, useEffect} from "react";
import './Dashboard.css';
import CreateTransactionModal from "../CreateTransaction/CreateTransactionModal";
import { apiCall } from "./example";
import TransactionCard from "../../TransactionCard/TransactionCard";
import FilterForm from "../../FilterForm/FilterForm";
function Dashboard(){

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
        console.log(name, value)
        setQueryData(prev => ({
            ...prev,
            [name] : value
        }))

    }

    function onSubmit(event){
        event.preventDefault();
        console.log(queryData);
    }

    function resetFilters(){
        setQueryData(prev => {
            console.log(prev.searchQuery)
            return {
                categories: "",
                minValue: "",
                maxValue: "",
                searchQuery: prev.searchQuery
            }
        })
        console.log(queryData);
    }

    var transactionComponents = apiCall.data.map( transaction => 
    <TransactionCard transaction={transaction} />)

    return(
        <div className="dashboard">
            
            <div className="top-section">

                <h2>Dashboard</h2>

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
                    
                        {transactionComponents}

                    </div>
                </div>
            </main>

            <CreateTransactionModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
    )

}

export default Dashboard;
