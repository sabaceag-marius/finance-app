import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import TransactionsPage from "./components/Pages/TransactionsPage/TransactionsPage";
import LogInPage from "./components/Pages/LogInPage/LogInPage";
import SignUpPage from "./components/Pages/SignUpPage/SignUpPage";
import TransactionCard from "./components/TransactionCard/TransactionCard";
import { Slide, ToastContainer } from "react-toastify";
import { UserProvider } from "./context/AuthContext";

function App() {
  
  
  return (
    <>
    <UserProvider>
      <Navbar />
      <Outlet />
      <ToastContainer position="top-center" autoClose="2000" transition={Slide} />
    </UserProvider>
    </>
  );
}



export default App;
