"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useInView } from "react-intersection-observer";

const EmotionVisualizer = ({ emotions }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });


  const colors = [
    "#111827",
    "#1E293B",
    "#2D3748",
    "#4B5563",
    "#9CA3AF",
    "#10B981",
    "#3B82F6",
    "#818CF8",
    "#0EA5E9",
  ];

  const totalMessages = Object.values(emotions).reduce(
    (acc, count) => acc + count,
    0
  );

  const data = Object.keys(emotions).map((emotion, index) => ({
    name: emotion,
    value: emotions[emotion],
    color: colors[index % colors.length],
  }));

  return (
    <div ref={ref} className="py-28 px-4 rounded-xl shadow-lg overflow-hidden">
      <div className="w-full text-center mb-6">
        <p className="text-lg font-semibold text-gray-800">
          I am feeling {data[0]?.name || "unsure"} today
        </p>
      </div>
      <div className="w-full h-[250px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              dataKey="value"
              label={({ name }) => name}
              isAnimationActive={inView}
              animationBegin={0}
              animationDuration={2000}
              animationEasing="ease-out"
              tabIndex={-1}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} tabIndex={-1} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div
        className="flex flex-wrap justify-center items-end gap-2"
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        {data.map(({ name, value, color }, i) => (
          <React.Fragment key={name}>
            <div
              className="flex flex-col items-center sm:items-end"
              style={{ margin: "0 4px" }}
            >
              <div className="flex items-end">
                <div className="h-[50px] bg-white rounded-md flex items-end">
                  <div
                    className="w-4 rounded-b-md"
                    style={{
                      backgroundColor: color,
                      height: `${(value / totalMessages) * 120}px`,
                    }}
                    title={`${name}: ${Math.round(
                      (value / totalMessages) * 100
                    )}%`}
                  />
                </div>
                <div className="flex flex-col items-center pl-1">
                  <p
                    className="text-xs font-medium text-gray-700 text-vertical"
                    style={{
                      writingMode: "vertical-rl",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </p>
                </div>
              </div>
              <div className="w-full text-center">
                <p className="text-xs font-normal text-gray-500 mt-1">
                  
                </p>
              </div>
            </div>
            {i === 4 && <div className="w-full block sm:hidden" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EmotionVisualizer;
