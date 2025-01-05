import React from 'react';
import './Navbar.css'
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
export default function Navbar(){

    const {isLoggedIn} = useAuth();
    const {logoutUser} = useAuth();
    return(
        <nav>

            <Link to="/" className='logo'>
                <h1>Pocket Planner</h1>
            </Link>

            {isLoggedIn() ?

                <div className='buttons--section'>
                    <Link to="/transactions">Transactions</Link>
                    <Link to="/user">User</Link>
                    <a href='#' onClick={logoutUser}>Log out</a>
                </div>
                :
                <div className='buttons--section'>
                    <Link to="/login">Log in</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
        </nav>
    )

}