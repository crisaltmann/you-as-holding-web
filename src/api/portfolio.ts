import { request } from "../utils/request";
import { Asset } from "./assets";

export type Portfolio = {
  ativo: Asset;
  id_usuario: number;
  quantidade: number;
  valor: number;
};

export const all = (userId: number) =>
  request.get(`portfolio?usuario=${userId}`).json<Portfolio[]>();
