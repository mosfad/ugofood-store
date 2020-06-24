import _ from "lodash";
import { FETCH_ORDERS, ADD_ORDER, UPDATE_ORDER } from "../actions/types";

const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, items: action.payload };
    case ADD_ORDER:
      return {
        ...state,
        items: [...state.items, ...action.payload],
      };
    case UPDATE_ORDER:
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            return item._id === action.payload[0]._id
              ? {
                  ...item,
                  status: action.payload[0].status,
                  completedOrderAt: Date.now,
                }
              : item;
          }),
        ],
      };

    default:
      return state;
  }
};
