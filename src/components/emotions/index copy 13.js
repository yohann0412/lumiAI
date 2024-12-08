"use client";

import React, { useRef, useState, useEffect } from "react";

const EmotionVisualizer = ({ emotions }) => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

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

  const createPieData = (data) => {
    let startAngle = 0;
    return data.map((d) => {
      const angle = (d.value / totalMessages) * 2 * Math.PI;
      const endAngle = startAngle + angle;
      const segment = { ...d, startAngle, endAngle };
      startAngle = endAngle;
      return segment;
    });
  };

  const pieData = createPieData(data);

  const width = 300;
  const height = 300;
  const radius = 80;
  const innerRadius = 50;
  const centerX = width / 2;
  const centerY = height / 2;

  const arcPath = (startAngle, endAngle, rOuter, rInner) => {
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const startOuterX = centerX + rOuter * Math.cos(startAngle);
    const startOuterY = centerY + rOuter * Math.sin(startAngle);
    const endOuterX = centerX + rOuter * Math.cos(endAngle);
    const endOuterY = centerY + rOuter * Math.sin(endAngle);

    const startInnerX = centerX + rInner * Math.cos(endAngle);
    const startInnerY = centerY + rInner * Math.sin(endAngle);
    const endInnerX = centerX + rInner * Math.cos(startAngle);
    const endInnerY = centerY + rInner * Math.sin(startAngle);

    return `
      M ${startOuterX} ${startOuterY}
      A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
      L ${startInnerX} ${startInnerY}
      A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${endInnerX} ${endInnerY}
      Z
    `;
  };

  const calculateTextPosition = (startAngle, endAngle, r) => {
    const midAngle = (startAngle + endAngle) / 2;
    return {
      x: centerX + r * Math.cos(midAngle),
      y: centerY + r * Math.sin(midAngle),
    };
  };

  const calculateLineEndPosition = (startAngle, endAngle, r) => {
    const midAngle = (startAngle + endAngle) / 2;
    return {
      x: centerX + r * Math.cos(midAngle),
      y: centerY + r * Math.sin(midAngle),
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-6 bg-gray-100"
    >
      <div className="p-6 rounded-xl shadow-lg w-full bg-white relative">
        <div className="w-full text-center mb-6">
          <p className="text-lg font-semibold text-gray-800">
            I am feeling {data[0]?.name || "unsure"} today
          </p>
        </div>
        <div className="w-full h-[250px] flex justify-center">
          <svg width={width} height={height}>
            <defs>
              {pieData.map((segment, index) => (
                <linearGradient
                  id={`gradient-${index}`}
                  key={`gradient-${index}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                  <stop
                    offset="50%"
                    stopColor={segment.color}
                    stopOpacity="1"
                  />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                </linearGradient>
              ))}
            </defs>
            {pieData.map((segment, index) => {
              const path = arcPath(
                segment.startAngle,
                segment.endAngle,
                radius,
                innerRadius
              );

              const textPos = calculateTextPosition(
                segment.startAngle,
                segment.endAngle,
                radius + 40
              );

              const lineEndPos = calculateLineEndPosition(
                segment.startAngle,
                segment.endAngle,
                radius
              );

              return (
                <g key={index}>
                  <path
                    d={path}
                    fill={`url(#gradient-${index})`}
                    style={{
                      transition: "transform 0.8s ease-out",
                      transform: inView ? "scale(1)" : "scale(0)",
                      transformOrigin: "center center",
                    }}
                  />
                  <line
                    x1={lineEndPos.x}
                    y1={lineEndPos.y}
                    x2={textPos.x}
                    y2={textPos.y}
                    stroke="#333"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#333"
                    fontSize="12px"
                  >
                    {segment.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EmotionVisualizer;
