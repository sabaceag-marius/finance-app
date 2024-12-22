import React, {useState} from "react";
import "./SignUpPage.css"
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
export default function SignUpPage(){

    const {registerUser} = useAuth();

    // Handle form data

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    })

    function handleInputChange(event){
        const {name,value} = event.target;

        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    async function handleSubmit(event){
        event.preventDefault();

        registerUser(formData.email,formData.username,formData.password);
        
        // console.log(formData);

        // var response = await registerAPI(formData.email,formData.username,formData.password);
        
        // console.log(response);

    }

    return(

        <div className="align-center--wrapper">
        <div className="signup--card">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <label className="login-label" htmlFor="email">Email</label>
                <input 
                    className="login-input"
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <label className="login-label" htmlFor="username">Username</label>
                <input 
                    className="login-input"
                    type="text" 
                    id="username" 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />

                <label className="login-label" htmlFor="password">Password</label>
                <input 
                    className="login-input"
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    />

                <button className="submit-button">Register</button>
            </form>
            
            <p>Do you already have an account? <Link to="/login">Log in</Link> </p>
        </div>
        </div>
    )

}