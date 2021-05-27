import { request } from "../utils/request";

export type Asset = {
  codigo: string;
  cotacao: number;
  id: number;
  logo: string;
  nome: string;
};

export type AssetData = {
  codigo: string;
  logo: string;
  nome: string;
};

export const all = () => request.get("assets").json<Asset[]>();
export const save = (asset: AssetData) =>
  request.post("assets", { json: asset });
