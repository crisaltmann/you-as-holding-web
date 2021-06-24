import { request } from "../utils/request";

export type Quarter = {
  id: number;
  codigo: string;
  ano: number;
  trimestre: number;
  data_inicio: string;
  data_fim: string;
  trimestre_anterior: number;
};

export const quarter = (quarterId: number) =>
  request.get(`/quarters/${quarterId}`).json<Quarter>();
