import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Consolidated, Holding } from "../../api/holding";

export const DataChart = ({ data }: { data: Consolidated[] }) => {
  const chart = data?.map((d) => ({
    name: d.ano,
    div_ebitda: d.div_ebitda,
    divida_liquida: d.divida_liquida,
    ebitda: d.ebitda,
    lucro_liquido: d.lucro_liquido,
    margem_ebitda: (d.margem_ebitda * 100).toFixed(0),
    receita_liquida: d.receita_liquida,
  }));

  return (
    <ResponsiveContainer width='50%' height={250}>
      <LineChart
        data={chart}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          name='Dívida líquida/EBITDA'
          type='monotone'
          dataKey='div_ebitda'
          stroke='#1B7473'
        />
        <Line
          name='Dívida líquida'
          type='monotone'
          dataKey='divida_liquida'
          stroke='#810E8A'
        />
        <Line
          name='EBITDA'
          type='monotone'
          dataKey='ebitda'
          stroke='#FFC300 '
        />
        <Line
          name='Lucro líquido'
          type='monotone'
          dataKey='lucro_liquido'
          stroke='#FF5733'
        />
        <Line
          name='Margem líquida/EBITDA'
          type='monotone'
          dataKey='margem_ebitda'
          stroke='#27741B'
        />
        <Line
          name='Receita líquida'
          type='monotone'
          dataKey='receita_liquida'
          stroke='#1B3674'
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
