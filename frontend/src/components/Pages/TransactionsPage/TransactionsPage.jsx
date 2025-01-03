import React, {useState, useEffect} from "react";
import './Transactions.css';
import CreateTransactionModal from "../../CreateTransactionModal/CreateTransactionModal";
import {apiCall} from "./example";
import TransactionCard from "../../TransactionCard/TransactionCard";
import FilterForm from "../../FilterForm/FilterForm";
import {useAuth} from "../../../context/AuthContext";
import {getTransactionsAPI, getTransactionsCountAPI} from "../../../services/TransactionsService";
import PageSelector from "../../PageSelector/PageSelector";
import {objectEquals} from "../../../utils/ObjectEquality";

function TransactionsPage() {

    // Add transaction modal

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // Filter form
    const [queryData, setQueryData] = useState({
        category: "",
        minValue: "",
        maxValue: "",
        searchString: ""
    });

    const [submittedQueryData, setSubmittedQueryData] = useState(queryData);

    function onChangeQuery(event) {

        const {name, value} = event.target

        setQueryData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    async function onSubmit(event) {
        event.preventDefault();

        console.log(objectEquals(queryData,submittedQueryData));
        // If the last time we fetched the data we had the same filters
        // there is no reason to fetch it again
        if (objectEquals(queryData,submittedQueryData)) return;


        await fetchData(queryData);
        setSubmittedQueryData(queryData);
    }

    function resetFilters() {

        setQueryData({
            category: "",
            minValue: "",
            maxValue: "",
            searchString: ""
        });

        if(objectEquals(submittedQueryData,{
            category: "",
            minValue: "",
            maxValue: "",
            searchString: ""
        })) return;

        console.log("QD: ",queryData);
        fetchData(queryData).then();
        setSubmittedQueryData(queryData);
        console.log("SQD: ",submittedQueryData);

    }

    // Data from backend

    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const transactionsPerPage = 2;

    async function fetchData(data) {

        const resultTransactions = await getTransactionsAPI(data);

        if (resultTransactions == null)
            return;


        const resultCount = await getTransactionsCountAPI(data);

        if (resultCount == null)
            return;

        setTransactions(resultTransactions);
        setPageCount(Math.ceil(resultCount / transactionsPerPage));

    }

    useEffect(() => {
        fetchData(queryData).catch(console.error);
    }, []);

    const transactionComponents = transactions.map(transaction =>
        <TransactionCard key={transaction.id} transaction={transaction}/>);

    return (
        <div className="transactions-container">

            <div className="top-section">

                <div className="top-section-inputs">
                    <div className="search-bar">
                        <input type="text"
                               name="searchString"
                               onChange={onChangeQuery}
                               value={queryData.searchString}
                        />
                        <button onClick={onSubmit}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>

                    <button onClick={openModal}>+ Add</button>
                </div>
            </div>

            <main>

                <div className="filter-section">
                    <h2>Filter</h2>
                    <FilterForm
                        handleChange={onChangeQuery}
                        handleSubmit={onSubmit}
                        handleReset={resetFilters}
                        stateData={queryData}
                    />
                </div>

                <div className="transactions-section">

                    <h2>Transactions</h2>

                    <div className="transactions-container">
                        {
                            transactionComponents.length === 0 ?
                                <h3>There are no transactions</h3>
                                :
                                transactionComponents
                        }

                    </div>

                    <PageSelector pageCount={pageCount}/>

                </div>
            </main>
            <CreateTransactionModal isModalOpen={isModalOpen} closeModal={closeModal} onSubmit={() => {
                fetchData(queryData).then()
            }}/>
        </div>
    )

}

export default TransactionsPage;
