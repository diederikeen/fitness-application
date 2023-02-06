import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

import { IWeightRecord } from "@/utils/types";

export function WeightGraph({ records }: { records: IWeightRecord[] }) {
  const lowestGraphValue = getMinGraphValue(records);
  const highestGraphValue = getMaxGraphValue(records);

  return (
    <ResponsiveContainer width={"100%"} aspect={2.5}>
      <LineChart
        width={730}
        height={250}
        data={weightRecordMap(records)}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <YAxis
          domain={[lowestGraphValue, highestGraphValue]}
          tickLine={false}
          width={0}
        />
        <Tooltip labelFormatter={() => <span />} />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#3c40c6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function weightRecordMap(records: IWeightRecord[]) {
  return records
    .map((record) => ({
      name: new Date(record.date),
      weight: record.weight,
    }))
    .sort((a, b) => sortOnDate(a.name, b.name));
}

function sortOnDate(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}

function getMinGraphValue(records: IWeightRecord[]) {
  return (
    records.reduce((prev, current) =>
      Math.min(prev.weight) < Math.min(current.weight) ? prev : current
    ).weight - 10
  );
}

function getMaxGraphValue(records: IWeightRecord[]) {
  return (
    records.reduce((prev, current) =>
      Math.min(prev.weight) > Math.min(current.weight) ? prev : current
    ).weight - 10
  );
}
