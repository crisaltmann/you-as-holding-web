import { request } from "../utils/request";

type HoldingProps = {
  userId: string;
  expand?: boolean;
};

type Asset = {
  id: number;
  codigo: string;
  nome: string;
};

type AssetData = {
  ativo: Asset;
  id_trimestre: number;
  receita_liquida: number;
  ebitda: number;
  margem_ebitda: number;
  lucro_liquido: number;
  margem_liquida: number;
  divida_liquida: number;
  div_ebitda: number;
};

export interface Holding {
  trimestre: Quarter;
  receita_liquida: number;
  ebitda: number;
  margem_ebitda: number;
  lucro_liquido: number;
  margem_liquida: number;
  divida_liquida: number;
  div_ebitda: number;
  ativos: AssetData[];
}

export interface Consolidated {
  ano: number;
  receita_liquida: number;
  ebitda: number;
  margem_ebitda: number;
  lucro_liquido: number;
  margem_liquida: number;
  divida_liquida: number;
  div_ebitda: number;
}

export interface Holdings {
  holdings: Holding[];
  consolidated: Consolidated[];
}

type Quarter = {
  id: number;
  ano: number;
  trimestre: number;
  codigo: string;
};

export const holding = ({ userId, expand }: HoldingProps) => {
  const searchParams = new URLSearchParams();
  searchParams.append("usuario", userId);
  if (expand) {
    searchParams.append("expandir", `${expand}`);
  }

  return request.get(`holdings`, { searchParams }).json<Holdings>();
};
