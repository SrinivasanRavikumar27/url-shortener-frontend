// define initial state
const initialState = {
    user : null,
    userProfile : null
}

// create user Reducer
const userReducer = (state = initialState,action) => {

    switch(action.type){
        case 'SignIn-User' :
            return{
                ...state,
                user : action.payLoad
            };
        case 'View-Profile' : 
             return{
                ...state,
                userProfile: action.payLoad
             };
        case 'Update-Password' : 
             return{
                ...state,
                user : action.payLoad
             };
        case 'User-Logout' : 
             return{
                ...state,
                user : null,
                userProfile : null
             };
        default : 
              return state;    
    }

};

// export  the reducer to be used in store creation
export default userReducer;