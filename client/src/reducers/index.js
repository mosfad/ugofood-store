import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
  product: productReducer,
});
