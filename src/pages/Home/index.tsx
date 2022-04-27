import React, { useEffect } from "react";
import {
  getCashIn,
  getCashOutJuridical,
  getCashOutNatural,
} from "store/slices/commissionFeeCalculatorSlice";
import { BulkCalculationSwitcher } from "components/index";
import { RootState, useAsyncDispatch } from "store/store";
import { useSelector } from "react-redux";
import CalculateBulk from "./components/CalculateBulk";

function Home() {
  const { isBulkCalculation } = useSelector(
    (state: RootState) => state.commissionFeeCalculator
  );
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    dispatch(getCashIn());
    dispatch(getCashOutNatural());
    dispatch(getCashOutJuridical());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="inner-container">
        <BulkCalculationSwitcher />
        {!isBulkCalculation && <div>Calculate One</div>}
        {isBulkCalculation && <CalculateBulk />}
      </div>
    </div>
  );
}

export default Home;
