import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types";

const INITIAL_STATE = {
  modalOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalOpen: true };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false };
    default:
      return state;
  }
};
