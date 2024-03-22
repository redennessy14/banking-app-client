import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { cardsReducer } from "./slices/cards";
import { trasactionsReducer } from "./slices/transaction";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    transactions: trasactionsReducer,
  },
});

export default store;
