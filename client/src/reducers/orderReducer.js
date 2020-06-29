import _ from "lodash";
import {
  FETCH_CURRENT_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_CURRENT_ORDER,
} from "../actions/types";

const INITIAL_STATE = {
  items: [],
  currentOrder: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload }; //May not be needed.
    case ADD_ORDER:
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case UPDATE_ORDER: //Order is added after it's successful***
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            return item._id === action.payload[0]._id
              ? {
                  ...item,
                  status: action.payload[0].status,
                  completedOrderAt: action.payload[0].completedOrderAt,
                  cardDetails: action.payload[0].cardDetails,
                }
              : null;
          }),
        ],
      };
    case DELETE_CURRENT_ORDER:
      return {
        ...state,
        items: [
          ...state.items.filter((item) => item._id !== action.payload[0]._id),
        ],
      };
    default:
      return state;
  }
};
