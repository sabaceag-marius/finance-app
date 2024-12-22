import React from 'react';
import './Navbar.css'
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
export default function Navbar(){

    const {isLoggedIn} = useAuth();
    const {logoutUser} = useAuth();
    return(
        <nav>

            <div className='logo'>
                <h1>Pocket Planner</h1>
            </div>

            {isLoggedIn() ?

                <div className='buttons--section'>
                    <Link to="/dashboard">Dashboard</Link>
                    <a href='#' onClick={logoutUser}>Log out</a>
                    {/* <Link to="/login">Log in</Link>
                    <Link to="/register">Register</Link> */}
                    {/* <a href='#'>User</a>
                    <a href='#'>Log out</a> */}
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