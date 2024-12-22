import { createBrowserRouter } from "react-router";
import App from '../App'
import SignUpPage from "../components/Pages/SignUpPage/SignUpPage";
import LogInPage from "../components/Pages/LogInPage/LogInPage";
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/register", element: <SignUpPage /> },
            {path: "/login", element: <LogInPage /> },
            {path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> }
        ]
    }
])