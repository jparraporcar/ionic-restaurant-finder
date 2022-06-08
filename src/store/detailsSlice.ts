import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Review = {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: {
    id: string;
    profile_url: string;
    image_url: string;
    name: string;
  };
};

export type TDetails = {
  name: string;
  id: string;
  image_url: string;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: {
    alias: string;
    title: string;
  };
  rating: number;
  coordinates: { latitude: number; longitude: number };
  photos: string[];
};

export interface IDetailsState {
  recordDetails: TDetails | null;
  reviews: Review[] | null;
}

const initialState = {
  recordDetails: {},
  reviews: [],
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setRecordDetails: (
      state,
      action: PayloadAction<IDetailsState["recordDetails"]>
    ) => {
      if (action.payload) {
        state.recordDetails = action.payload;
      }
      return state;
    },
  },
});

export const { setRecordDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
