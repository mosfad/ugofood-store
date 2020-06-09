import { SIGN_OUT, SIGN_IN, SIGN_UP } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userToken: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userToken: action.payload.token };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userToken: null };
    case SIGN_UP:
      return;
    default:
      return state;
  }
};
