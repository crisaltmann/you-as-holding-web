import { Console } from "console";

export const formatCurrency = (value: number) =>
  `R$ ${value.toFixed(2).toString().replace(".", ",").replace(/(\d)(?=(\d{3})+\b)/g, "$1.")}`;