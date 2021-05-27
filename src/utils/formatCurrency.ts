export const formatCurrency = (value: number) =>
  `R$ ${value.toString().replace(".", ",")}`;
