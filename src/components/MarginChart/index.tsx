import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Consolidated } from "../../api/holding";

export const MarginChart = ({ data }: { data: Consolidated[] }) => {
  const chart = data?.map((d) => ({
    name: d.ano,
    margin: (d.margem_liquida * 100).toFixed(0),
  }));

  const toPercent = (decimal: string) => `${decimal}%`;

  return (
    <ResponsiveContainer width='50%' height={250}>
      <BarChart data={chart}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis tickFormatter={toPercent} />
        <Tooltip formatter={toPercent} />
        <Legend />
        <Bar name='Margem' dataKey='margin' fill='#0E3A8A' />
      </BarChart>
    </ResponsiveContainer>
  );
};
