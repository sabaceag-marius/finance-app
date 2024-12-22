import React, {useState} from "react";
import "./LogInPage.css";
import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
export default function LogInPage(){

    const {loginUser} = useAuth();

    // Form data
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleInputChange(event){
        const {name,value} = event.target

        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
    }

    async function handleSubmit(event){
        event.preventDefault()
        
        // console.log(formData)

        loginUser(formData.username,formData.password);
        // console.log(response)
        
    }

    // Password visibility toggle

    const [showPassword,setShowPassword] = useState(false)

    function toggleShowPassword(){
        setShowPassword(prevState => !prevState);
    }

    return(

        <div className="align-center--wrapper">
            <div className="login--card">
            <h1>Log in</h1>
            
            <form onSubmit={handleSubmit}>
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
                
                <div className="password-input-container">
                    <input 
                        className="password-input"
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span onClick={toggleShowPassword} className="material-symbols-outlined password-toggle">
                        {showPassword ? 'visibility_off' : 'visibility'}</span>
                </div>

                <button className="submit-button">Log in</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link> </p>
        </div>
        </div>

    )

}