import { configureStore } from "@reduxjs/toolkit";
import recordReducer from "./slices/recordSlice";

// Creates a Redux store, and also automatically configure the Redux DevTools
// extension so that you can inspect the store while developing
export const store = configureStore({
  reducer: {
    record: recordReducer,
  },
});
