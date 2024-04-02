// import combine reducer to combine all reducer in one 
import { combineReducers } from "redux";
// import the reducers for user.
import userReducer from "./userReducers";

// create root reducere
const rootReducer = combineReducers({
user : userReducer,
});

// export  the root reducer
export default rootReducer;