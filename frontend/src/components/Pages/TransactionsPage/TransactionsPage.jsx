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

    // region Add Transaction Modal

    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    // endregion

    // region Filter forms

    const EMPTY_QUERY_DATA = {
        category: "",
        minValue: "",
        maxValue: "",
        searchString: ""
    };
    const [queryData, setQueryData] = useState(EMPTY_QUERY_DATA);

    const [submittedQueryData, setSubmittedQueryData] = useState(EMPTY_QUERY_DATA);

    function onChangeQuery(event) {

        const {name, value} = event.target

        setQueryData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    // Function that it is called when we submit the filter or search form
    function onSubmit(e){
        e.preventDefault();

        // Don't submit if the last query had the same filters
        // to prevent fetching the same data
        if(objectEquals(queryData,submittedQueryData)) return;

        // Change the last submitted query data => the effect hook will fetch the new data
        setSubmittedQueryData(queryData);
    }

    function resetFilters(){

        // Note: we use the emptyQueryData for setting and comparing with the last query
        // because the set functions for the state hooks run asynchronously

        // Reset the data from the forms
        setQueryData(EMPTY_QUERY_DATA);

        // Don't submit if the last query didn't have any filters
        if(objectEquals(submittedQueryData, EMPTY_QUERY_DATA)) return;

        // Change the last submitted query data => the effect hook will fetch the new data
        setSubmittedQueryData(EMPTY_QUERY_DATA);
    }

    //endregion


    // region Paging

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const PAGE_SIZE = 2;

    //endregion

    // region Fetching Data (useEffect)



    // When we change the current page - fetch the transactions for that page

    useEffect(() => {
        getTransactionsAPI(submittedQueryData,currentPage, PAGE_SIZE).then(result => {

            if(result === undefined) return;

            setTransactions(result);
        });

    }, [currentPage]);

    // When we submit a query with different filters - fetch the pageCount and the transactions for the first page
    useEffect(() => {
        console.log("Fetch page count and transactions for 1st page");
        getTransactionsCountAPI(submittedQueryData).then(result =>{

            if(result === undefined) return;

            setPageCount(Math.ceil(result / PAGE_SIZE));
        });

        // When we change the current page we fetch the transactions for that page
        // so we check before what is the current page to prevent fetching the data twice

        if(currentPage !== 1) {
            setCurrentPage(1);
        }
        else {
            getTransactionsAPI(submittedQueryData, currentPage, PAGE_SIZE).then(result => {

                if(result === undefined) return;

                setTransactions(result);
            });
        }

    }, [submittedQueryData]);


    // endregion


    const [transactions, setTransactions] = useState([]);

    const transactionComponents = transactions.map(transaction =>
        <TransactionCard key={transaction.id} transaction={transaction}/>);

    return (
        <div className="transactions-container">

            <div className="top-section">

                <div className="top-section-inputs">
                    <form className="search-bar" onSubmit={onSubmit}>
                        <input type="text"
                               name="searchString"
                               onChange={onChangeQuery}
                               value={queryData.searchString}
                        />
                        <button onClick={onSubmit}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </form>

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

                    <PageSelector pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

                </div>
            </main>
            <CreateTransactionModal isModalOpen={isModalOpen} closeModal={closeModal} handleSubmit={() => {
                setSubmittedQueryData(EMPTY_QUERY_DATA);
            }}/>
        </div>
    )

}

export default TransactionsPage;
