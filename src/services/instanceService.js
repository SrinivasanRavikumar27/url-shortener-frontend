// import axios to do base url
import axios from "axios";

// define baseUrl
const baseUrl = 'https://url-shortener-backend-vy42.onrender.com';

// create auth instance basic
const authInstance = axios.create({
    baseURL :  baseUrl, 
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json',
    }
});

// Protected Instance
const protectedInstance = axios.create({
    baseURL :  baseUrl, 
    timeout : 5000,
    headers : {
        'Content-Type' : 'application/json',
    }
});

// protected instance using token authorization
protectedInstance.interceptors.request.use( config => {

    const loggedinUser = sessionStorage.getItem('loggedInUser');

    if(loggedinUser){

        const authToken =JSON.parse(loggedinUser).token;

        config.headers['Authorization'] = `Bearer ${authToken}` ;

    }

    return config;

});

// export 
export default  {
authInstance,protectedInstance
}