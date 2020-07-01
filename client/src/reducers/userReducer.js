import {
  FETCH_USER,
  UNFETCH_USER,
  ADD_PRODUCT_REVIEW,
  FETCH_PRODUCT_BEING_REVIEWED,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      //console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case UNFETCH_USER:
      return Object.assign({});
    case ADD_PRODUCT_REVIEW:
      return { ...state, review: action.payload };
    case FETCH_PRODUCT_BEING_REVIEWED:
      return { ...state, feedbackProduct: action.payload };
    default:
      return state;
  }
};
