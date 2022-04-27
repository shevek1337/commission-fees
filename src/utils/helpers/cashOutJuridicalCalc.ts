import * as Api from "api/index";
import moment from "moment";
import * as Types from "types/index";
import { roundUp } from "./fns";

interface CashOutJuridicalCalcProps {
  readonly transactions: Types.CommissionFeeCalculatorState["data"];
  readonly percents: Api.GetCashOutJuridicalRequestType["percents"];
  readonly minimumAmount: Api.GetCashOutJuridicalRequestType["min"]["amount"];
}

const cashOutJuridicalCalc = ({
  transactions,
  percents,
  minimumAmount,
}: CashOutJuridicalCalcProps) => {
  const cashOutFeesForJuridicalUsers = {} as { [key: string]: number[] };

  transactions.map((transaction) => {
    if (
      transaction.user_type !== "juridical" ||
      transaction.type !== "cash_out"
    ) {
      return null;
    }

    const weekUser = `week${moment(transaction.date)
      .startOf("isoWeek")
      .week()}-user${transaction.user_id}`;

    if (!cashOutFeesForJuridicalUsers[weekUser]) {
      cashOutFeesForJuridicalUsers[weekUser] = [];
    }

    const commissionFee = (transaction.operation.amount * percents) / 100;
    cashOutFeesForJuridicalUsers[weekUser].push(
      commissionFee < minimumAmount ? minimumAmount : roundUp(commissionFee)
    );
    return cashOutFeesForJuridicalUsers;
  });
  return cashOutFeesForJuridicalUsers;
};

export default cashOutJuridicalCalc;
