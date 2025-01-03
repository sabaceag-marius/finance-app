import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import {loginAPI, registerAPI} from "../services/AuthService";
import {toast} from "react-toastify";
import handleError from "../services/ErrorService";

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [loggedStatus,setLoggedStatus] = useState(false);
    useEffect(() => {

        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {

            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, [loggedStatus]);


    const registerUser = async (email, username, password) => {
        const result = await registerAPI(email, username, password).catch(e => handleError(e));

        if (!result) {
            return;
        }

        const userObject = {
            username: result?.username,
            email: result?.email,
        };

        // Store in local storage

        localStorage.setItem('token', result?.token);
        localStorage.setItem('user', JSON.stringify(userObject));


        setToken(result?.token);
        setUser(userObject);
        setLoggedStatus(true);
        toast.success("Logged in successfully!");

        navigate('/transactions');
    }

    const loginUser = async (username, password) => {
        const result = await loginAPI(username,password).catch(e => handleError(e));

        if(!result){
            return;
        }

        const userObject = {
            username: result?.username,
            email: result?.email,
        };

        // Store in local storage

        localStorage.setItem('token',result?.token);
        localStorage.setItem('user',JSON.stringify(userObject));


        setToken(result?.token);
        setUser(userObject);
        setLoggedStatus(true);
        toast.success("Logged in successfully!");

        navigate('/transactions');



    }
    const isLoggedIn = () => {
        return !!user;
    }

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        axios.defaults.headers.common["Authorization"] = "";
        setLoggedStatus(false);
        toast.success("Logged out successfully!");

        navigate("/");
    };

    return (
        <UserContext.Provider value={{loginUser, registerUser, logoutUser, user, token, isLoggedIn}}>
            {isReady ? children : null}
        </UserContext.Provider>
    )
}

export const useAuth = () => React.useContext(UserContext);