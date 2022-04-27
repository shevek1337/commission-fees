import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import commissionFeeCalculatorReducer from "./slices/commissionFeeCalculatorSlice";

export const store = configureStore({
  reducer: {
    commissionFeeCalculator: commissionFeeCalculatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAsyncDispatch = () => useDispatch<AppDispatch>();
