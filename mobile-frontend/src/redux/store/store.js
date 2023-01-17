import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import chatsReducer from "../reducers/chatsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
