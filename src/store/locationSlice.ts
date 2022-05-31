import { createSlice, PayloadAction, current, Action } from "@reduxjs/toolkit";
import { recording } from "ionicons/icons";

export interface Record {
  showInfo: boolean | undefined;
  alias: string;
  displayAddress: string;
  distance: string;
  id: string;
  imageUrl: string;
  isOpen: boolean;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  price: string;
  rating: number;
  Url: string;
}

interface PositionState {
  latitude: number | undefined;
  longitude: number | undefined;
  records: Record[];
  results: Record[];
}

const initialState = {
  latitude: undefined,
  longitude: undefined,
  records: [],
  results: [],
} as PositionState;

export const areaSelectedSlice = createSlice({
  name: "areaSelected",
  initialState,
  reducers: {
    setPosition: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      // console.log(`state longitude in reducer action is ${state.longitude}`);
      // console.log(`state latitude in reducer action is ${state.latitude}`);
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    setRecords: (state, action: PayloadAction<Record[]>) => {
      const records = action.payload;
      state = { ...state, records };
      return state;
    },
    setResults: (state, action: PayloadAction<Record[]>) => {
      return { ...state, results: action.payload };
    },
  },
});

export const { setPosition, setRecords, setResults } =
  areaSelectedSlice.actions;
export default areaSelectedSlice.reducer;
