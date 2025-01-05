import axios from "axios";
import { Slide, toast } from "react-toastify";
export default function handleError(error){

    if(!axios.isAxiosError(error) || error.code === "ERR_NETWORK"){
        notifyError("Internal server error"); 
        return;
    }

    
    let errorData = error.response?.data.errorMessage;

    if(!errorData) errorData = error.response?.data;

    notifyError(errorData);
    
}

function notifyError(message){

    toast.error(message);
}