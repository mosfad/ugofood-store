import { FETCH_PRODUCTS } from "../actions/types";
import _ from "lodash";

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
