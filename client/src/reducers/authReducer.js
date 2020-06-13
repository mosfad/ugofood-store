import { SIGN_OUT, SIGN_IN, SIGN_UP, AUTO_SIGN_IN } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userToken: null,
  emailError: null,
  passwordError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: action.payload.success || false,
        userToken: action.payload.token || null,
        emailError: action.payload.email || null,
        passwordError: action.payload.password || null,
      };
    case AUTO_SIGN_IN:
      return {
        isSignedIn: true,
        userToken: action.payload,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userToken: null };
    case SIGN_UP:
      return;
    default:
      return state;
  }
};

/*
Responses from server when user signs in.
{
    "email": "User not found"
}

{
    "password": "Password is incorrect"
}

{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDU0YzVmYjNkNDNlNDIwNGUyNGQyYSIsImVtYWlsIjoibWFhZmFkaW5hQGdtYWlsLmNvbSIsImlhdCI6MTU5MTc3NjYxMCwiZXhwIjoxNTkxNzgwMjEwfQ.U4sxru99MWiQHQ77wBgLDf77_AT0gGxGwV7hqOGJR28"
}

*/
