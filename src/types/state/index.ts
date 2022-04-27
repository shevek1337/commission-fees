import { CurrencyTypeEnum, OperationTypeEnum, UserTypeEnum } from "../enums";

interface CashOutNatural {
  readonly percents: number;
  readonly week_limit: {
    readonly amount: number;
    readonly currency: CurrencyTypeEnum;
  };
}

interface CashOutJuridical {
  readonly percents: number;
  readonly min: {
    readonly amount: number;
    readonly currency: CurrencyTypeEnum;
  };
}

interface CashIn {
  readonly percents: number;
  readonly max: {
    readonly amount: number;
    readonly currency: CurrencyTypeEnum;
  };
}

interface CommissionFees {
  readonly [key: string]: number[];
}

export interface CommissionFeeCalculatorState {
  readonly cashOutNaturalCommissionFees: CommissionFees;
  readonly cashInCommissionFees: CommissionFees;
  readonly cashOutJuridicalCommissionFees: CommissionFees;
  readonly isBulkCalculation: boolean;
  readonly cashIn: CashIn;
  readonly cashOutNatural: CashOutNatural;
  readonly cashOutJuridical: CashOutJuridical;
  readonly data: {
    readonly date: string;
    readonly user_id: number;
    readonly user_type: UserTypeEnum;
    readonly type: OperationTypeEnum;
    readonly operation: {
      readonly amount: number;
      readonly currency: CurrencyTypeEnum;
    };
  }[];
}
