import React from "react";
import Button from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateCommissionFees,
  clearCommissionFees,
} from "store/slices/commissionFeeCalculatorSlice";
import { RootState } from "store/store";
import { v4 as uuidv4 } from "uuid";

function CalculateBulk() {
  const dispatch = useDispatch();
  const {
    cashInCommissionFees,
    cashOutNaturalCommissionFees,
    cashOutJuridicalCommissionFees,
  } = useSelector((state: RootState) => state.commissionFeeCalculator);

  return (
    <>
      <h2>Bulk Fee Calculation</h2>
      <p className="text-gray-sm">
        * Input file is located in public folder...
      </p>
      <Button active onClick={() => dispatch(calculateCommissionFees())}>
        Calculate
      </Button>
      {Object.keys(cashInCommissionFees).length > 0 && (
        <>
          <h3>Cash In Commission Fees</h3>
          {Object.values(cashInCommissionFees).map((value) => {
            return value.map((fee) => <p key={uuidv4()}>{fee}</p>);
          })}
        </>
      )}
      {Object.keys(cashOutNaturalCommissionFees).length > 0 && (
        <>
          <h3>Cash Out Commission Fees for Natural</h3>
          {Object.values(cashOutNaturalCommissionFees).map((value) => {
            return value.map((fee) => <p key={uuidv4()}>{fee}</p>);
          })}
        </>
      )}
      {Object.keys(cashOutJuridicalCommissionFees).length > 0 && (
        <>
          <h3>Cash Out Commission Fees for Juridical</h3>
          {Object.values(cashOutJuridicalCommissionFees).map((value) => {
            return value.map((fee) => <p key={uuidv4()}>{fee}</p>);
          })}
        </>
      )}
      {(Object.keys(cashOutNaturalCommissionFees).length > 0 ||
        Object.keys(cashOutJuridicalCommissionFees).length > 0 ||
        Object.keys(cashInCommissionFees).length > 0) && (
        <Button active onClick={() => dispatch(clearCommissionFees())}>
          Clear
        </Button>
      )}
    </>
  );
}

export default CalculateBulk;
