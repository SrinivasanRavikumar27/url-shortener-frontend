// import Store
import { createStore } from "redux";
// import root reducer
import rootReducer from "./reducers/rootreducers";

// CREATE strore 
const store = createStore(rootReducer);

// export store 
export default store;