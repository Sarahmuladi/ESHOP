import React from 'react'
import { useState } from 'react';
import "./login.css";
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext} from 'react'



const Login = () => { 

    const navigate = useNavigate();

    const { login} = useContext(AuthContext);
    const { setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    

    const handleSubmit = async(e) => {
    e.preventDefault();

     const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      if (response.ok) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          setUser(data.user); // Update context
          navigate("/"); 
      } else {
          console.error("Login failed:", data.error);
      }

    }


return (
    <>
    <form onSubmit = {handleSubmit}>
    <div className='Loginbg'>
    <div className='loginForm'>

      <div className='heading'><h4>LOGIN</h4></div>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <div>
      <input type='email' placeholder='  Email' className='input' onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div>
      <input type='password' placeholder='Password' className='input' style={{marginBottom: "0rem"}}
      onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <div className='rememberMe'>
        <input type='checkbox'/>
        <p>Remember Me</p>
      </div>

      <button type='submit' className='loginbtn'>LOGIN</button>

     <div style={{padding: "0px 80px"}}><p>Or login with</p></div>
      
      <div>
        <div style={{display: "flex"}}>
        <div style={{display: "flex", justifyContent: "space-between",
           padding: "10px 30px", boxShadow: "0px 0px 20px #ccc"}}>
         <FaFacebookSquare style={{color: "navy"}}/>
         <div style={{color:"navy", fontWeight: "bold"}}>Facebook</div>
        </div>

        <div style={{display: "flex", justifyContent: "space-between", 
          padding: "10px 30px", boxShadow: "0px 0px 20px #ccc"}}>
         < FcGoogle/>
         <div style={{fontWeight: "bold"}}>Google</div>
        </div>
        </div>

        <p style={{padding: "0px 40px"}}>Not a member? <a href='./register'>Sign up now</a></p>

      </div>
    </div>
    </div>
  
</form>
</>

  );
}

export default Login;