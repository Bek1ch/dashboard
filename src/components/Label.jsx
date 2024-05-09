import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#7bd784",
  "#dd7576",
  "#152d5b",
  "#76abdd",
  "#e69b58",
  "#3c7782",
];

const PieChartWithCustomizedLabel = ({ data }) => {
  const dataArr = useMemo(() => {
    if (!data) return [];
    const nData = Object.keys(data).map((key) => {
      const chartObj = { name: key, value: data[key] };
      return chartObj;
    });
    return nData;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dataArr}
          cx="50%"
          cy="50%"
          innerRadius={90}
          paddingAngle={8}
          dataKey="value"
        >
          {dataArr.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={COLORS[index]}
              fill={COLORS[index]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartWithCustomizedLabel;
