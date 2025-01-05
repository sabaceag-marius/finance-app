import axios from "axios";
import handleError from "./ErrorService";

const api = 'https://localhost:7284/api';

export async function loginAPI(username, password) {
    
    try{

        const response = await axios.post(api + '/accounts/login',{
            'username' : username,
            'password' : password
        });

        return response.data;

    }
    catch(error){
        handleError(error);
    }

}

export async function registerAPI(email,username, password) {

    try{

        const response = await axios.post(api + '/accounts/register',{
            'email' : email,
            'username' : username,
            'password' : password
        });

        return response.data;

    }
    catch(error){
        console.log(error);
        handleError(error);
    }
}

export async function deleteUserAPI(){
    try{
        const response = await axios.delete(api+"/accounts/delete");
        console.log(":3");
        return response.data;
    }
    catch (error){
        handleError(error);
    }
}