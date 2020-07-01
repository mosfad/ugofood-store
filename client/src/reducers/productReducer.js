import { FETCH_PRODUCTS } from "../actions/types";
import _ from "lodash";

// const INITIAL_STATE = {
//   isSignedIn: null,
//   userToken: null,
//   emailError: null,
//   passwordError: null,
// };

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        storeProducts: action.payload,
        // ..._.mapKeys(action.payload, "_id"),
      };
    default:
      return state;
  }
};
