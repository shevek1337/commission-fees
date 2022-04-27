import { CurrencyTypeEnum } from "types/enums";

export interface GetCashInRequestType {
  readonly percents: number;
  readonly max: {
    readonly amount: number;
    readonly currency: CurrencyTypeEnum;
  };
}
