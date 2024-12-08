"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const EmotionVisualizer = ({ emotions }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const colors = [
    "#A9D6E5",
    "#90E0EF",
    "#CAF0F8",
    "#ADE8F4",
    "#D9ED92",
    "#B5E48C",
    "#76C893",
    "#34A0A4",
    "#168AAD",
    "#1A759F",
    "#184E77",
    "#DDE5B6",
    "#F9DCC4",
    "#E8A598",
    "#F4BFBF",
    "#B8C0FF",
    "#D6A2E8",
    "#E2C2CF",
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
    <div ref={ref} className="p-6 rounded-xl shadow-lg bg-white overflow-hidden">
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
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center items-end">
        {data.map(({ name, value, color }) => (
          <div
            key={name}
            className="flex flex-col items-center mx-2"
            style={{ margin: "0 4px" }}
          >
            <div className="h-[50px] bg-gray-100 rounded-md flex items-end">
              <motion.div
                className="w-4 rounded-b-md"
                style={{ backgroundColor: color }}
                initial={{ height: 0 }}
                animate={inView ? { height: `${(value / totalMessages) * 120}px` } : { height: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                title={`${name}: ${Math.round((value / totalMessages) * 100)}%`}
              />
            </div>
            <p className="text-xs font-medium text-gray-700 mt-1 text-center">
              {name}
            </p>
            <p className="text-xs font-normal text-gray-500 mt-0.5">
              {Math.round((value / totalMessages) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionVisualizer;
