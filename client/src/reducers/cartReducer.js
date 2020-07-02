import _ from "lodash";
import {
  FETCH_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QTY,
  RESET_CART_QTY_STATUS,
} from "../actions/types";

const INITIAL_STATE = {
  qtyUpdated: false,
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CART:
      return { ...state, items: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isEmpty: false,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => {
          // console.log(item);
          // console.log(action.payload);
          return item.productId._id !== action.payload[0].productId._id;
        }),
      };
    case UPDATE_CART_ITEM_QTY:
      //update here is swapping the positions of the cart items
      //thus swapping the quantities and displaying erroneous
      //sums!!!!!!!!!!!!!!!!
      return {
        ...state,
        items: [
          ...state.items.map((item) => {
            return item.productId._id === action.payload[0].productId._id
              ? { ...item, quantity: action.payload[0].quantity }
              : item;
          }),
        ],
        qtyUpdated: true,
      };
    case RESET_CART_QTY_STATUS:
      return { ...state, qtyUpdated: false };
    default:
      return state;
  }
};

// items: [
//   ...state.items.filter(
//     (item) => item.productId._id !== action.payload[0].productId._id
//   ),
//   ...action.payload,
// ]
