import handleError from "./ErrorService";
import axios from "axios";

const api = 'https://localhost:7284/api';

export async function getTransactionsAPI(queryData){

    const queryParams = getQueryParams(queryData);

    try{
        const response = await axios.get(api+"/transactions",{params: queryParams});
        return response.data;
    }
    catch (error){
        handleError(error);
    }

}

export async function getTransactionAPI(id){

    const response = await axios.get(`${api}/transactions/${id}`);
    return response.data;
}

export async function addTransactionAPI(transaction){
    try{
        await axios.post(api+"/transactions",{
            ...transaction,
            value : parseFloat(transaction.value)
        });

        return false;
    }
    catch (error){
        handleError(error);
        return true;
    }
}

export async function deleteTransactionAPI(id){
    try{
        await axios.delete(`${api}/transactions/${id}`);
    }
    catch (error){
        handleError(error);
    }
}

export async function updateTransactionAPI(id,transaction){
    try{
        await axios.put(`${api}/transactions/${id}`,transaction);
        return false;

    }
    catch (error){
        handleError(error);

        return true;
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
        SearchString: queryData.searchString.length === 0 ? null : queryData.searchString
    };
}