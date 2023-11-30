import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  collections: [],
};
const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    updateItems: (state, action) => {
      state.items = action.payload;
    },
    updateCollections: (state, action) => {
      state.collections = action.payload;
    },
  },
});

export const { updateItems, updateCollections } = itemSlice.actions;

export default itemSlice.reducer;
