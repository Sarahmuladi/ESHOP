import React, { useState } from 'react';
import "./register.css";
import { useNavigate } from 'react-router-dom';
//import dotenv from 'dotenv';
import config from './config';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        
        const response = await fetch(`${config.backendUrl}/api/register`, {
        method: "POST",
        headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
                setError('Failed to register');
        }

        else {
        setMessage("Registered Successful");
        navigate('/login');
           

        const data = await response.json();
        console.log(data);
           
        } 
    };

return (
 <>
    <form onSubmit = {handleRegister}>
    <div className='Loginbg'>
    <div className='loginForm'>

        <div className='heading'><h4>REGISTER</h4></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <div>
        <input type='text' placeholder='Enter Name' className='input' onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
        <input type='email' placeholder='Enter Email' className='input' onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
        <input type='password' placeholder='Enter Password' className='input' style={{ marginBottom: "0rem" }} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div>
        <input type='password' placeholder='Confirm Password' className='input' style={{ margin: "2rem 0rem" }} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type='submit' className='loginbtn'>SUBMIT</button>

        <p style={{ padding: "0px 20px" }}>Already have an account? <a href='./login'>Sign in</a></p>
        </div>
    </div>
    </form>
 </>
);
};

export default Register;