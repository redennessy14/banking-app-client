import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (userId) => {
    const { data } = await axios.get(`/cards/${userId}`);

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCards.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const cardsReducer = cardsSlice.reducer;
