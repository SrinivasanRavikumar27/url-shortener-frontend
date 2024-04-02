import React from 'react';

// import for router and route from  react-router-dom to navigate between pages.
import {Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// importing the components that will be used in this file.
import Home from './pages/Home/Home.jsx';
import Login from './pages/Home/Login.jsx';
import Signup from './pages/Home/Signup.jsx';
import ChangePassword from './pages/Home/ChangePassword.jsx';
import PasswordReset from './pages/Home/PasswordReset.jsx';
import  DashBoard from './pages/Dashboard/DashBoard.jsx';
import Navbar from './components/Navbar.jsx';
import CreateUrlShortener from './pages/url/CreateUrlShortener.jsx';
import EditUrlShortener from './pages/url/EditUrlShortener.jsx';
import ViewUrlShortener from './pages/url/ViewUrlShortener.jsx';

// import Toaster  for showing success or error messages.
import { Toaster } from 'react-hot-toast';
import AccountActivation from './pages/Home/AccountActivation.jsx';


function App() {

  return (
    <Router>

<Navbar/>

{/* define toaster for show message in position and how much seconds based 1sec = 1000 */}
<Toaster position='top-right' toastOptions={ {duration :  3000} } />
<Routes>
  <Route path='/' element = {<Home/>}/>
  <Route path='/login' element = {<Login/>}/>
  <Route path='/signup' element = {<Signup/>}/>
  <Route path='/updatePassword/:id/:token' element = {<ChangePassword/>}/>
  <Route path='/reset-password' element = {<PasswordReset/>}/>
  <Route path='/activate/:id/:token' element = {<AccountActivation/>}/>
  <Route path='/dashBoard' element = {<DashBoard  />}/>
  <Route path = '/addUrl' element = {<CreateUrlShortener/>}/>
  <Route path = '/editUrl' element = {<EditUrlShortener/>}/>
  <Route path = '/viewUrl' element = {<ViewUrlShortener/>}/>
</Routes>

    </Router>
  )
}

export default App