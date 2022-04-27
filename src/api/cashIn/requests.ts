import axios from "axios";
import { GetCashInRequestType } from "./types";

const url = import.meta.env.VITE_API_BASE_URL;

export const getCashInRequest = () => {
  return axios.get<GetCashInRequestType>(`${url}cash-in`);
};
