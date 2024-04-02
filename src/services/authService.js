// import instance
import instance from './instanceService';
// for message,sucess and error notification
import toast from 'react-hot-toast';

// ------------------------------------------------------------------------

// signup service
const signup = async (user) => {
    try {
      console.log('User Registering ....');
  
      const response = await instance.authInstance.post('/api/signup', user);
      const data = response.data;
  
      if (response.status === 200) {
        toast.success(data.message);
  
        setTimeout(() => {
            toast(
                'Message: ' + data.message1,
                {style : {
                    background : "blue",
                    border : '1px solid grey'}
                },
            {duration : 5000}
            );
          }, 3000);
  
        return true;
      } else {
        toast.error(data.message);
        console.error("Error in user registration", data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error.response.data.message, error);
    }
  };
  

// ------------------------------------------------------------------------

// account activation service
const activateAccount = async (payload) => {
try {
    const response = await instance.authInstance.post('/api/activate',payload);

    if(await response.status === 200){
        toast.success(response.data.message);
        return true;
    }

} catch (error) {
    toast.error(error.response.data.message);
    console.error(error.response.data.message,error);
}
};

// ------------------------------------------------------------------------

//  login service
const login = async (user) => {

    console.log('user logging in ....');

    try {
        const response = await instance.authInstance.post('/api/login', user);

        const data = await response.data;
    
        if(response.status === 200){
    
    console.log("User logged in sucessfully");
    
        // after login set user data in sessionStorage to acess and authenthicate based on token
    sessionStorage.setItem('loggedInUser',JSON.stringify(data));
    
    toast.success(data.message);

    return true;
    
            }else{
                toast.error(data.message);
                console.error("Error in logged in user",data);
            }
    } catch (error) {
        toast.error(error.response.data.message);
        console.error(error.response.data.message,error);
    }

};

// ------------------------------------------------------------------------

// reset email
const sendResetEmail = async (email) => {
    try {
        
        const response = await instance.authInstance.post("/api/reset-password",email);

        if(response.status===200){
            toast.success(response.data.message);
            return true;
        }else{
            toast.error(response.data.message);
            console.log('Error in email send ..',response.data.message);
        }

    } catch (error) {
        toast.error(error.response.data.message);
        console.log( error.response.data.message,error);
    }
};

// ------------------------------------------------------------------------

// update password
const updatePassword = async (passwordData,config) => {
    try {
                
        const response = await instance.authInstance.patch('/api/updatePassword',passwordData,config);

        if(response.status === 200){

            // remove user data from session storage
               sessionStorage.removeItem('loggedInUser');
            
            // after password update set user data in sessionStorage to acess and authenthicate based on token
           sessionStorage.setItem('loggedInUser',JSON.stringify(response.data));

            toast.success(response.data.message);

            return response.data.user;
        }else{
            toast.error(response.data.message);
            console.log('error in update password .. ',response.data.message);
        }

    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error.response.data.message,error);
    }
};

// ------------------------------------------------------------------------

// export auth service
export default {
    signup,login,sendResetEmail,updatePassword,activateAccount
}