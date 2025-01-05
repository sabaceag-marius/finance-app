import handleError from "./ErrorService";
import axios from "axios";

const api = 'https://localhost:7284/api';

export async function getTransactionsAPI(queryData, pageNumber, pageSize){

    const queryParams = getQueryParams(queryData);
    queryParams.pageNumber = pageNumber;
    queryParams.pageSize = pageSize;

    try{
        const response = await axios.get(api+"/transactions",{params: queryParams});
        return response.data;
    }
    catch (error){
        handleError(error);
    }

}

export async function getTransactionAPI(id){

    try{
        const response = await axios.get(`${api}/transactions/${id}`);
        return response.data;
    }
    catch (error){
        handleError(error);
    }
}

export async function addTransactionAPI(transaction){

    try{
        const response = await axios.post(api + "/transactions", {
            ...transaction,
            value: transaction.value === "" ? undefined : parseFloat(transaction.value)
        });

        return response.data;
    }
    catch (error){
        handleError(error);
    }
}

export async function deleteTransactionAPI(id){
    try{
        const response = await axios.delete(`${api}/transactions/${id}`);
        return response.data;
    }
    catch (error){
        handleError(error);
    }
}

export async function updateTransactionAPI(id,transaction){
    try{
        const response = await axios.put(`${api}/transactions/${id}`,{
            ...transaction,
            value: transaction.value === "" ? undefined : parseFloat(transaction.value)
        });

        return response.data;

    }
    catch (error){
        handleError(error);
    }
}

export async function getTransactionsCountAPI(queryData){

    const queryParams = getQueryParams(queryData);

    try{
        const response = await axios.get(api+"/transactions/count",{params: queryParams});
        return response.data;
    }
    catch (error){
        handleError(error);
    }
}

function getQueryParams(queryData){
    return {
        CategoryName: queryData.category,
        MinimumValue: queryData.minValue.length === 0 ? null : parseFloat(queryData.minValue),
        MaximumValue: queryData.maxValue.length === 0 ? null : parseFloat(queryData.maxValue),
        SearchString: queryData.searchString.length === 0 ? null : queryData.searchString,
        beforeDate: queryData.beforeDate.length === 0 ? null : queryData.beforeDate,
        afterDate: queryData.afterDate.length === 0 ? null : queryData.afterDate,
    };
}