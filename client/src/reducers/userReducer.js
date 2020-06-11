import { FETCH_USER, UNFETCH_USER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      //console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case UNFETCH_USER:
      return Object.assign({});
    default:
      return state;
  }
};
