import axios from "axios";
import {
  GetCashOutNaturalRequestType,
  GetCashOutJuridicalRequestType,
} from "./types";

const url = import.meta.env.VITE_API_BASE_URL;

export const getCashOutNaturalRequest = () => {
  return axios.get<GetCashOutNaturalRequestType>(`${url}cash-out-natural`);
};

export const getCashOutJuridicalRequest = () => {
  return axios.get<GetCashOutJuridicalRequestType>(`${url}cash-out-juridical`);
};
