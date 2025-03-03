import React from 'react'
import "./register.css";


const Register = () => { 

  const handleClick = () =>{
    alert("registered successfully")
  }

  return (
    <div className='Loginbg'>
    <div className='loginForm'>
      <div className='heading'><h4>REGISTER</h4></div>

      <div>
      <input type='email' placeholder='Enter Email' className='input'/>
      </div>

      <div>
      <input type='password' placeholder='Enter Password' className='input' style={{marginBottom: "0rem"}}/>
      </div>

      <div>
      <input type='password' placeholder='Confirm Password' className='input' style={{margin: "2rem 0rem"}}/>
      </div>

      <button type='button' onClick={handleClick} className='loginbtn'>SUBMIT</button>

    
      
      

        <p style={{padding: "0px 20px"}}>Already have an account? <a href='./login'>Sign in</a></p>

      </div>
    </div>
    
  )
}

export default Register;