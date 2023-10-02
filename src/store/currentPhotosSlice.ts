import { createSlice } from "@reduxjs/toolkit";

import { PhotoI } from "@/types";

export interface CurrentPhotosI {
  photos: PhotoI[];
  loaded: number;
}

const currentPhotosSlice = createSlice({
  name: "currentPhotos",
  initialState: { photos: [], loaded: 0 } as CurrentPhotosI,
  reducers: {
    setPhotos(state, action) {
      state.photos = [...action.payload];
    },
    setLoaded(state, action) {
      if (action.payload === 0 || state.loaded < action.payload)
        state.loaded = action.payload;
    },
  },
});

export const championActions = currentPhotosSlice.actions;

export default currentPhotosSlice;
