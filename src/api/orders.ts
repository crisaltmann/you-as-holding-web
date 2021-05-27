import { request } from "../utils/request";

export type Order = {
  data: string;
  id: number;
  id_ativo: number;
  id_usuario: number;
  quantidade: number;
  tipo: string;
  valor: number;
};

export type OrderData = {
  data: string;
  id_ativo: number;
  id_usuario: number;
  quantidade: number;
  tipo: string;
  valor: number;
};

export const all = () => request.get("orders").json<Order[]>();
export const save = (order: OrderData) =>
  request.post("orders", { json: order });
