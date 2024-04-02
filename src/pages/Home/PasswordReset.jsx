import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import '../../styles/auth/passwordReset.css';

function PasswordReset() {

    const [email, setEmail] = useState({
      email : ""
    });

    const navigate = useNavigate();

    const handleResetEmail = async (e) => {

      e.preventDefault();

    const response =  await authService.sendResetEmail(email);

    if(response){
      
      setEmail({
        email : ''
       });
  
       navigate('/login');
  
    }
    
    };

  return (
    <div className='passwordReset-container'>
        
        <form onSubmit={handleResetEmail} >

        <h1>Password Reset Page</h1>

        <div className='input-group Email mt-2 ' >
      <span className="input-group-text" ><FontAwesomeIcon icon={faEnvelope} /></span>
      <input type="text" id="email" name="email" placeholder='enter your email ..' required value={email.email} 
            onChange={(e) => setEmail({...email,email : e.target.value})} />
      </div>

            <button className='btn btn-success btn-outline-dark mt-3 text-white text-uppercase font-weight-bold' type='submit' >Send Link to Reset Password</button>
        </form>

    </div>
  )
}

export default PasswordReset