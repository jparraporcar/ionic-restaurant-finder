import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Review = {
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

export type ReviewsDetails = {
  reviews: Review[] | null;
  total: number;
  possible_languages: string[];
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
  }[];
  rating: number;
  coordinates: { latitude: number; longitude: number };
  photos: string[];
};

export interface IDetailsState {
  recordDetails: TDetails | null;
  reviewsDetails: ReviewsDetails;
}

const initialState = {
  recordDetails: {} as TDetails,
  reviewsDetails: {} as ReviewsDetails,
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
    setReviews: (state, action: PayloadAction<ReviewsDetails>) => {
      state.reviewsDetails = action.payload;
      return state;
    },
  },
});

export const { setRecordDetails, setReviews } = detailsSlice.actions;
export default detailsSlice.reducer;
