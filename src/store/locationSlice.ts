import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  filterSearchText?: string;
}

const initialState = {
  latitude: undefined,
  longitude: undefined,
  records: [],
} as PositionState;

export const areaSelectedSlice = createSlice({
  name: "areaSelected",
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<PositionState>) => {
      state = action.payload;
      // console.log(`state longitude in reducer action is ${state.longitude}`);
      // console.log(`state latitude in reducer action is ${state.latitude}`);
      return state;
    },
    setRecords: (state, action: PayloadAction<PositionState>) => {
      const { records } = action.payload;
      state = { ...state, records };
      return state;
    },

    setFiltered: (state, action: PayloadAction<string>) => {
      const textFilter = action.payload;
      if (textFilter.trim() !== "") {
        const filteredRecords = state.records.filter((record) => {
          return record.name.includes(textFilter);
        });
        console.log(state);
        return (state = { ...state, records: filteredRecords });
      } else {
        console.log(state);
        return;
      }
    },
  },
});

export const { setPosition, setRecords, setFiltered } =
  areaSelectedSlice.actions;
export default areaSelectedSlice.reducer;
