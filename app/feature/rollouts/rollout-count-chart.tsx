import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";
import { stringToColor } from "@/app/lib/string";
import { Typography } from "../components/typography";

export const RolloutCountChart = ({
  data,
  keys,
}: {
  data: Record<string, number | string>;
  keys: string[];
}) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex gap-6 items-center justify-between mb-2">
        <Typography.DMMonoSmall className="uppercase font-bold">
          {data.name}
        </Typography.DMMonoSmall>
        <ResponsiveContainer height={20} width={200}>
          <BarChart layout="vertical" data={[data]} stackOffset="expand">
            <XAxis type="number" hide domain={[0, 1]} />
            <YAxis type="category" dataKey="name" hide />
            {keys.map((key) => (
              <Bar key={key} dataKey={key} stackId="a" barSize={5}>
                <Cell
                  key={`cell-${key}`}
                  fill={stringToColor(key)}
                  fillOpacity={
                    hoveredKey === null || hoveredKey === key ? 1 : 0.3
                  }
                />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex-col justify-center gap-6 text-sm">
        {keys.map((key) => {
          return (
            <div
              key={key}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="flex items-center gap-2 cursor-pointer pb-1"
            >
              <div
                className="w-2 h-2"
                style={{
                  backgroundColor: stringToColor(key),
                  opacity: hoveredKey === null || hoveredKey === key ? 1 : 0.4,
                }}
              />
              <div className="flex-1 flex justify-between">
                <span
                  className={
                    hoveredKey === key ? "font-medium" : "text-gray-500"
                  }
                >
                  {key}
                </span>
                <span className="text-gray-500">[{data[key]}]</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
