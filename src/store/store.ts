import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../store/locationSlice";

export const store = configureStore({
  reducer: locationReducer,
});

export type RootState = ReturnType<typeof store.getState>;
