import { configureStore } from "@reduxjs/toolkit";

type UserState = {
  user: string | null;
};

type UserAction = {
  type: string;
  payload?: string; // Payload contains a JWT token
};

const initialState: UserState = {
  user: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload as string };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
