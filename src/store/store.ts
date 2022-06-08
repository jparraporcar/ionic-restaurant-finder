import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../store/locationSlice";
import detailsReducer from "../store/detailsSlice";

export const store = configureStore({
  reducer: {
    locationReducer,
    detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
