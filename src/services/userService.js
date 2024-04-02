// import instance service js 
import instance from './instanceService.js';
// toast message service
import toast from 'react-hot-toast';

// user view profile service
const viewProfile = async (dispatch) => {

   try {
    console.log('getting the user profile...');

    const response = await instance.protectedInstance.get('/user/getProfile');

    if(response.status === 200){
        console.log('profile data fetched sucessfully..');
        await dispatch({type : 'View-Profile', payload: response.data});
        return response.data;
    }else if(response.status === 401){
        toast.error(response.data.message);
        console.log(response.data.message,response.data);
        return null;
    }
    
} catch (error) {
    toast.error(error.response.data.message);
    console.error(error.response.data.message,error);
    return null;
}

};

// export  the action creator to be used in redux
export default{
    viewProfile
}