import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MarginChart = ({ data }: { data: any }) => {
  console.log(data);
  const chart = data?.map((d: any) => ({
    name: d.ano,
    margin: (d.margem_liquida * 100).toFixed(0),
  }));

  const toPercent = (decimal: any) => `${decimal}%`;

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
