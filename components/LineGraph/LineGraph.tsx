import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { AxisDomainItem } from "recharts/types/util/types";

interface Props<T> {
  data: T[];
  dataKey: keyof T;
  lowestGraphValue?: AxisDomainItem;
  highestGraphValue?: AxisDomainItem;
  displayTickLine?: boolean;
  width?: number;
}

export function LineGraph<T>({
  data,
  dataKey,
  lowestGraphValue = "dataMin",
  highestGraphValue = "dataMax",
  displayTickLine = false,
  width = 730,
}: Props<T>) {
  return (
    <ResponsiveContainer width={"100%"} aspect={2.5}>
      <LineChart
        width={width}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <YAxis
          domain={[lowestGraphValue, highestGraphValue]}
          tickLine={displayTickLine}
          width={0}
        />
        <Tooltip labelFormatter={() => <span />} />
        <Line
          type="monotone"
          dataKey={dataKey as string}
          stroke="#3c40c6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
