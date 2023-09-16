import { createStore, combineReducers } from "redux";
import propertyReducer from "./reducers/propertyReducer";

const rootReducer = combineReducers({
  properties: propertyReducer,
});

const store = createStore(rootReducer);

export default store;
