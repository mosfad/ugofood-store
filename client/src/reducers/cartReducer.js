import _ from "lodash";
import { FETCH_CART, ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const INITIAL_STATE = {
  isEmpty: true,
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CART:
      return { ...state, items: action.payload };
    case ADD_TO_CART:
      return { ...state, items: [...action.payload], isEmpty: false };
    case REMOVE_FROM_CART:
      return _.omit(state, action.payload); //REVIEW THIS
    default:
      return state;
  }
};
