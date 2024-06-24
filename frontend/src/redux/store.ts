import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

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

// Persist the user state in local storage
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
