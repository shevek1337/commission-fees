import * as Api from "api/index";
import * as Types from "types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import bulkData from "../../../public/input.json";
import {
  cashInFeeCalculation,
  cashOutJuridicalCalc,
  cashOutNaturalCalc,
} from "../../utils";

const init: Types.CommissionFeeCalculatorState = {
  cashOutNaturalCommissionFees: {},
  cashOutJuridicalCommissionFees: {},
  cashInCommissionFees: {},
  isBulkCalculation: true,
  cashIn: {
    max: {
      amount: 0,
      currency: Types.CurrencyTypeEnum.EUR,
    },
    percents: 0,
  },
  cashOutNatural: {
    percents: 0,
    week_limit: {
      amount: 0,
      currency: Types.CurrencyTypeEnum.EUR,
    },
  },
  cashOutJuridical: {
    percents: 0,
    min: {
      amount: 0,
      currency: Types.CurrencyTypeEnum.EUR,
    },
  },
  data: bulkData as Types.CommissionFeeCalculatorState["data"],
};

export const getCashIn = createAsyncThunk<Api.GetCashInRequestType>(
  "commissionFeeCalculator/getCashIn",
  async () => {
    const response = await Api.getCashInRequest();
    return response.data;
  }
);

export const getCashOutNatural =
  createAsyncThunk<Api.GetCashOutNaturalRequestType>(
    "commissionFeeCalculator/getCashOutNatural",
    async () => {
      const response = await Api.getCashOutNaturalRequest();
      return response.data;
    }
  );

export const getCashOutJuridical =
  createAsyncThunk<Api.GetCashOutJuridicalRequestType>(
    "commissionFeeCalculator/getCashOutJuridical",
    async () => {
      const response = await Api.getCashOutJuridicalRequest();
      return response.data;
    }
  );

export const commissionFeeCalculatorSlice = createSlice({
  name: "commissionFeeCalculator",
  initialState: init,
  reducers: {
    activateBulkCalculation: (state) => {
      state.isBulkCalculation = true;
      state.data = bulkData as Types.CommissionFeeCalculatorState["data"];
    },
    disableBulkCalculation: (state) => {
      state.isBulkCalculation = false;
      state.data = [
        {
          date: moment(new Date()).format("YYYY-MM-DD"),
          type: Types.OperationTypeEnum.cash_in,
          user_id: 1,
          user_type: Types.UserTypeEnum.natural,
          operation: {
            amount: 0,
            currency: Types.CurrencyTypeEnum.EUR,
          },
        },
      ];
    },
    calculateCommissionFees: (state) => {
      state.cashOutNaturalCommissionFees = cashOutNaturalCalc({
        transactions: state.data,
        percents: state.cashOutNatural.percents,
        weekLimit: state.cashOutNatural.week_limit,
      });

      state.cashOutJuridicalCommissionFees = cashOutJuridicalCalc({
        transactions: state.data,
        percents: state.cashOutJuridical.percents,
        minimumAmount: state.cashOutJuridical.min.amount,
      });

      state.cashInCommissionFees = cashInFeeCalculation({
        transactions: state.data,
        percents: state.cashIn.percents,
        maximumAmount: state.cashIn.max.amount,
      });
    },
    clearCommissionFees: (state) => {
      state.cashOutJuridicalCommissionFees = {};
      state.cashOutNaturalCommissionFees = {};
      state.cashInCommissionFees = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCashIn.fulfilled, (state, action) => {
        state.cashIn = action.payload;
      })
      .addCase(getCashOutNatural.fulfilled, (state, action) => {
        state.cashOutNatural = action.payload;
      })
      .addCase(getCashOutJuridical.fulfilled, (state, action) => {
        state.cashOutJuridical = action.payload;
      });
  },
});

export const {
  activateBulkCalculation,
  disableBulkCalculation,
  calculateCommissionFees,
  clearCommissionFees,
} = commissionFeeCalculatorSlice.actions;

export default commissionFeeCalculatorSlice.reducer;
