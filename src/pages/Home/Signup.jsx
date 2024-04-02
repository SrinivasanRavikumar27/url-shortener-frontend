import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/auth/signup.css';

function Signup() {

    const [signupData,setSignupData] = useState({
        fristName : "",
        lastName : "",
        email : "",
        password : ""
    });

    const navigate = useNavigate();

    const handleSignup = async (event) => {

        event.preventDefault();

    const response =  await authService.signup(signupData);

    if(response){
        setSignupData({
            fristName : "",
            lastName : "",
            email:'',
            password:''
        });
            // setTimeout(()=>{navigate("/login")},1500); if need add timeout function.

            // navigate to login page
            navigate("/login")
    }
      
    };

    const loginPage = () => {
        navigate('/login');
    };

  return (
    <div className='signup-container'>

        <form onSubmit={handleSignup}>

<h1>Signup Page</h1>

           <div className='fristName' >
           <label htmlFor='fristName' >FristName : </label>
            <input  type='text' placeholder='enter your fristName ..' id='fristName' name='fristName' required 
            value={signupData.username} onChange={(e) => setSignupData({...signupData,fristName : e.target.value})} />
           </div>
            
            <div className='lastName'>
            <label htmlFor='lastName' >LastName : </label>
            <input type='text' placeholder='enter your lastName ..' id='lastName' name='lastName' required 
            value={signupData.username} onChange={(e) => setSignupData({...signupData,lastName : e.target.value})} />
            </div>
            
<div className='email'>
<label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email" placeholder='enter your email .. ' required 
            value={signupData.email} onChange={(e) => setSignupData({...signupData,email : e.target.value})} />
</div>
            
            <div className='password'>
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" name="password" placeholder='enter your password ..' required 
            value={signupData.password} onChange={(e) => setSignupData({...signupData,password : e.target.value})} />
            </div>
          
            
            <button className='btn btn-success btn-outline-dark mt-3 text-white text-uppercase font-weight-bold' type="submit">Sign Up</button>

            <p className='font-weight-bold mt-2'>Already have an account? <button className='btn btn-info btn-outline-dark text-white text-uppercase font-weight-bold' onClick={loginPage} >Login</button></p>

        </form>
    </div>
  )
}

export default Signup