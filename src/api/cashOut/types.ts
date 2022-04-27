import * as Types from "types/index";

export interface GetCashOutNaturalRequestType {
  readonly percents: number;
  readonly week_limit: {
    readonly amount: number;
    readonly currency: Types.CurrencyTypeEnum;
  };
}

export interface GetCashOutJuridicalRequestType {
  readonly percents: number;
  readonly min: {
    readonly amount: number;
    readonly currency: Types.CurrencyTypeEnum;
  };
}
