import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useDispatch } from 'react-redux';
import '../../styles/auth/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';

function Login() {

    // define data
    const [loginData,setLoginData] = useState({
        email : "",
        password : ""
    });

    // define navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // login function
    const handleLogin = async (event) => {

        // page should not refresh 
        event.preventDefault();
      
// call login service from authservice
const response = await authService.login(loginData);

if(response){
    // usedispatch function
if(loginData){
    dispatch({type : 'SignIn-User', payload: loginData});
}
   
// to set feilds empty after login
setLoginData({
    email : "",
    password :""
});

// after login navigate through dashboard
navigate('/dashBoard');

// refresh page
window.location.reload();

}

    };

    // sigup button for navigation
    const signupPage = () => {
        navigate( "/signup" );
    };

  return (
    <div className='login-container'>

        <form onSubmit={handleLogin}>
        
        <h1>Login Page</h1>

      <div className='input-group Email mt-2 ' >
      <span className="input-group-text" ><FontAwesomeIcon icon={faEnvelope} /></span>
        <input className='emailInput' type="email" id="email" name="email"  placeholder='email@example.com' required
            value={loginData.email} onChange={(e) => setLoginData({...loginData,email : e.target.value})} />
      </div>

      <div className='input-group mt-2 Email' >
      <span className="input-group-text" ><FontAwesomeIcon icon={faKey} /></span>
      <input className='passwordInput' type="password" id="password" name="password" placeholder='example@11' required 
            value={loginData.password} onChange={(e) => setLoginData({...loginData,password : e.target.value})} />
      </div>

            <button className='btn btn-outline-dark btn-success text-white text-uppercase mt-2 font-weight-bold' type="submit">Login</button> 
            
            <p className='font-weight-bold'>D'not have an account? <button className='btn btn-info btn-outline-dark text-uppercase font-weight-bold' onClick={signupPage} >Signup</button></p>

            <p className='font-weight-bold'>Forgot password? <button className='btn btn-danger btn-outline-dark text-white text-uppercase font-weight-bold' onClick={(e) => navigate('/reset-password')} >Forgot Password</button></p>

        </form>
    </div>
  )
}

export default Login;