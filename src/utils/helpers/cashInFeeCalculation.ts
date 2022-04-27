import * as Api from "api/index";
import moment from "moment";
import * as Types from "types/index";
import { roundUp } from "./fns";

interface CashInFeeCalculationProps {
  readonly transactions: Types.CommissionFeeCalculatorState["data"];
  readonly percents: Api.GetCashInRequestType["percents"];
  readonly maximumAmount: Api.GetCashInRequestType["max"]["amount"];
}

const cashInFeeCalculation = ({
  transactions,
  percents,
  maximumAmount,
}: CashInFeeCalculationProps) => {
  const cashInFees = {} as { [key: string]: number[] };

  transactions.map((transaction) => {
    if (transaction.type !== "cash_in") {
      return null;
    }

    const weekUser = `week${moment(transaction.date)
      .startOf("isoWeek")
      .week()}-user${transaction.user_id}`;

    if (!cashInFees[weekUser]) {
      cashInFees[weekUser] = [];
    }

    const commissionFee = (transaction.operation.amount * percents) / 100;
    cashInFees[weekUser].push(
      commissionFee > maximumAmount ? maximumAmount : roundUp(commissionFee)
    );
    return cashInFees;
  });
  return cashInFees;
};

export default cashInFeeCalculation;
