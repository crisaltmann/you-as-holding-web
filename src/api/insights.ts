import { request } from "../utils/request";

type Quarter = {
  id: number;
  ano: number;
  trimestre: number;
  codigo: string;
};

type Asset = {
  id: number;
  codigo: string;
  nome: string;
};

export type Insight = {
  trimestre: Quarter;
  ativo_maior_receita: Asset;
  receita_maior_delta: number;
  ativo_maior_ebitda: Asset;
  ebitda_maior_delta: number;
  ativo_maior_lucro: Asset;
  lucro_maior_delta: number;
  ativo_maior_divida: Asset;
  divida_delta: number;
};

export type Insights = {
  insights: Insight[];
};

export const summary = (userId: number) =>
  request.get(`insights-summary?usuario=${userId}`).json<Insights>();
