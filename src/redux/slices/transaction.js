import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchTransactions = createAsyncThunk(
  "cards/fetchTransactions",
  async (cardId) => {
    const { data } = await axios.get(`/transaction/${cardId}`);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const trasactionsReducer = transactionsSlice.reducer;
