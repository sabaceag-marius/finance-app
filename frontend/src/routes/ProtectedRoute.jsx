import React, { Children } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({children}){

    const location = useLocation();
    const {isLoggedIn} = useAuth();


    return (

        isLoggedIn() ?
        <>{children}</>
        :
        <Navigate to="/login" state={{from: location}} replace></Navigate>
    )
}