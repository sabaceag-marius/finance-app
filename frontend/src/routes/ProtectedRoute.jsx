import React, { Children } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({children,isAuthorized,redirectPage}){

    const location = useLocation();
    const {isLoggedIn} = useAuth();

    // const redirectPage = isAuthorized ? "/transactions" : "/login";

    return (

        isLoggedIn() !== isAuthorized ?
        <>{children}</>
        :
        <Navigate to={redirectPage} state={{from: location}} replace></Navigate>
    )
}