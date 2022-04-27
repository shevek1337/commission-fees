import * as Types from "types/index";
import * as Api from "api/index";
import moment from "moment";
import { roundUp } from "./fns";

interface WeeklyFreeOfChargeCalcProps {
  readonly transactions: Types.CommissionFeeCalculatorState["data"];
  readonly weekLimit: Api.GetCashOutNaturalRequestType["week_limit"];
  readonly percents: Api.GetCashOutNaturalRequestType["percents"];
}

const cashOutNaturalCalc = ({
  transactions,
  weekLimit,
  percents,
}: WeeklyFreeOfChargeCalcProps) => {
  let weekLimitLeft = weekLimit.amount;

  const mathSign = (num: number) => {
    if (Math.sign(num) === -1) {
      return 0;
    }
    return num;
  };

  const cashOutFeesForNaturalUsers = {} as { [key: string]: number[] };

  transactions.map((transaction) => {
    if (
      transaction.user_type !== "natural" ||
      transaction.type !== "cash_out"
    ) {
      return null;
    }

    const weekUser = `week${moment(transaction.date)
      .startOf("isoWeek")
      .week()}-user${transaction.user_id}`;

    if (!cashOutFeesForNaturalUsers[weekUser]) {
      cashOutFeesForNaturalUsers[weekUser] = [];
      weekLimitLeft = weekLimit.amount;
    }

    if (weekLimitLeft >= 0) {
      cashOutFeesForNaturalUsers[weekUser].push(
        mathSign(
          roundUp(
            ((transaction.operation.amount - weekLimitLeft) * percents) / 100
          )
        )
      );
    } else {
      cashOutFeesForNaturalUsers[weekUser].push(
        roundUp((transaction.operation.amount * percents) / 100)
      );
    }

    weekLimitLeft -= transaction.operation.amount;
    return weekLimitLeft;
  });
  return cashOutFeesForNaturalUsers;
};

export default cashOutNaturalCalc;
