import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fetchingReducer from "./fetchingReducer";

export default combineReducers({
  auth: authReducer,
  fetching: fetchingReducer,
});
