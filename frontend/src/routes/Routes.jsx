import { createBrowserRouter } from "react-router";
import App from '../App'
import SignUpPage from "../components/Pages/SignUpPage/SignUpPage";
import LogInPage from "../components/Pages/LogInPage/LogInPage";
import TransactionsPage from "../components/Pages/TransactionsPage/TransactionsPage";
import ProtectedRoute from "./ProtectedRoute";
import TransactionDetailsPage from "../components/Pages/TransactionDetailsPage/TransactionDetailsPage";
import Dashboard from "../components/Pages/Dashboard/Dashboard";
import LandingPage from "../components/Pages/LandingPage/LandingPage";
import UserPage from "../components/Pages/UserPage/UserPage";
import ErrorPage from "../components/Pages/ErrorPage/ErrorPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/", element:<ProtectedRoute isAuthorized={true} redirectPage='/dashboard'><LandingPage /></ProtectedRoute>},
            {path: "/dashboard", element:<ProtectedRoute isAuthorized={false} redirectPage='/login'><Dashboard /></ProtectedRoute>},
            {path: "/register", element: <ProtectedRoute isAuthorized={true} redirectPage='/'><SignUpPage /></ProtectedRoute> },
            {path: "/login", element: <ProtectedRoute isAuthorized={true} redirectPage='/'><LogInPage /></ProtectedRoute> },
            {path: "/transactions", element: <ProtectedRoute isAuthorized={false} redirectPage='/login'><TransactionsPage /></ProtectedRoute> },
            {path: "/transactions/:id", element: <ProtectedRoute isAuthorized={false} redirectPage='/login'><TransactionDetailsPage/></ProtectedRoute>, errorElement: <ErrorPage/> },
            {path: "/user", element: <ProtectedRoute isAuthorized={false} redirectPage='/login'><UserPage/></ProtectedRoute> },
            {path: "*", element: <ErrorPage/>}
        ]
    }
])