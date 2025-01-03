import React from "react";
import ExpendituresChart from "../../ExpendituresChart/ExpendituresChart";
import './Dashboard.css';
import {useAuth} from "../../../context/AuthContext";

function Dashboard(props) {
    const {isLoggedIn} = useAuth();

    return (
        <main className='dashboard-container'>
            <section className='expenditure-section'>
                <ExpendituresChart/>
            </section>
        </main>
    );
}

export default Dashboard;