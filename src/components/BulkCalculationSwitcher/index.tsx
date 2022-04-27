import React from "react";
import Button from "components/Button";
import { useSelector } from "react-redux";
import { RootState, useAsyncDispatch } from "store/store";
import {
  activateBulkCalculation,
  disableBulkCalculation,
} from "store/slices/commissionFeeCalculatorSlice";

function BulkCalculationSwitcher() {
  const { isBulkCalculation } = useSelector(
    (state: RootState) => state.commissionFeeCalculator
  );
  const dispatch = useAsyncDispatch();

  return (
    <div className="bulk-switcher">
      <Button
        active={isBulkCalculation}
        onClick={() => dispatch(activateBulkCalculation())}
      >
        Calculate Bulk
      </Button>
      <Button
        active={!isBulkCalculation}
        onClick={() => dispatch(disableBulkCalculation())}
      >
        Calculate One
      </Button>
    </div>
  );
}

export default BulkCalculationSwitcher;
