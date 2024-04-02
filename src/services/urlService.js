import instance from '../services/instanceService.js';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------------------

const createUrl = async (payload) => {
try {
    
   const response = await instance.protectedInstance.post('/url/createUrl',payload);

    if(response.status === 200){
        toast.success(response.data.message);
        return true;
    }

} catch (error) {
    toast.error(error.response.data.message);
    console.error(error.response.data.message,error);
}
};

// ----------------------------------------------------------------------------------

const getAllUrls = async () => {
    try {
        
        const response = await instance.protectedInstance.get('/url/getUrl');

        if(response.status === 200){
            // toast.success(response.data.message);
            return response.data.data;
        }

    } catch (error) {
      toast.error(error.response.data.message);
    console.error(error.response.data.message,error);
    }
};

// ----------------------------------------------------------------------------------

const getShortUrl = async (shorturl) => {
try {
    
    const response = await instance.protectedInstance.get(`/url/shortUrl/${shorturl}`);

    if(response.status === 200){
        return response.data.url.url;
    }

} catch (error) {
    if(error.message){
        toast.error(error.message);
    console.error(error.message,error);
    }else{
        toast.error(error.response.data.message);
    console.error(error.response.data.message,error);
    }
}
};

// ----------------------------------------------------------------------------------

const dayWiseData = async () => {
    try {
        
        const response = await instance.protectedInstance.get('/url/dayWise');

        if(response.status === 200){
            return response.data;
        }

    } catch (error) {
        if(error.message){
            toast.error(error.message);
        console.error(error.message,error);
        }else{
            toast.error(error.response.data.message);
        console.error(error.response.data.message,error);
        }
    }
}

// ----------------------------------------------------------------------------------

const monthWiseData = async (month,year) => {
    try {

        const response = await instance.protectedInstance.get(`/url/monthWise/${month}/${year}`);

        if(response.status === 200){
            return response.data;
        }
        
    } catch (error) {
        if(error.message){
            toast.error(error.message);
        console.error(error.message,error);
        }else{
            toast.error(error.response.data.message);
        console.error(error.response.data.message,error);
        }
    }
}

// ----------------------------------------------------------------------------------


export default {
createUrl,getAllUrls,getShortUrl,dayWiseData,monthWiseData
};