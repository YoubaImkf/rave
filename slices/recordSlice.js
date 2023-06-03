import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the record state.
 * @module recordSlice
 */
const recordSlice = createSlice({
  name: "record",
  initialState: {
    recordingURI: null,
    isRecording: false,
    savedAudios: [],
    isPlaying: false,
    lastRecordUri: "",
  },
  reducers: {
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setSavedAudios: (state, action) => {
      state.savedAudios = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setLastRecordUri: (state, action) => {
      state.lastRecordUri = action.payload;
    },
  },
});

// Extract the action creators
export const {
  setIsRecording,
  setSavedAudios,
  setIsPlaying,
  setLastRecordUri,
} = recordSlice.actions;

export default recordSlice.reducer;
