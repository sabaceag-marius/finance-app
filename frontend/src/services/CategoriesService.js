import handleError from "./ErrorService";
import axios from "axios";

const api = 'https://localhost:7284/api';

export async function getCategoriesAPI(){

    try{
        const response = await axios.get(api+'/categories');
        return response.data;
    }
    catch(error){
        handleError(error);
    }

}

export async function getSpendingsAPI(){
    try{
        const response = await axios.get(api + '/categories/spendings');
        return response.data;
    }
    catch(error){
        handleError(error);
    }
}