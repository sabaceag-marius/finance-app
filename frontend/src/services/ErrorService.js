import axios from "axios";
import { Slide, toast } from "react-toastify";
export default function handleError(error){

    if(!axios.isAxiosError(error) || error.code === "ERR_NETWORK"){
        notifyError("Internal server error"); 
        return;
    }

    
    const errorData = error.response?.data.errorMessage;

    notifyError(errorData);
    
}

function notifyError(message){

    toast.error(message);
}