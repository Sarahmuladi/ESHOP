import React from 'react'
import "./login.css";
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const Login = () => { 

const navigate = useNavigate();

const handleClick = () => {
  navigate("/")
};

  return (
    <div className='Loginbg'>
    <div className='loginForm'>
      <div className='heading'><h4>LOGIN</h4></div>

      <div>
      <input type='email' placeholder='  Email' className='input'/>
      </div>

      <div>
      <input type='password' placeholder='Password' className='input' style={{marginBottom: "0rem"}}/>
      </div>

      <div className='rememberMe'>
        <input type='checkbox'/>
        <p>Remember Me</p>
      </div>

      <button type='button' className='loginbtn' onClick={handleClick}>LOGIN</button>

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
  )
}

export default Login;