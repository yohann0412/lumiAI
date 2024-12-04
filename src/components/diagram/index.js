import React, { useState, useMemo } from "react";

const Diagram = () => {
  const emotionSets = [
    {
      id: 0,
      emotions: {
        sad: 5,
        happy: 5,
        surprised: 5,
        angry: 5,
        calm: 5,
        afraid: 5,
        disgusted: 5,
        curious: 5,
        guilty: 5,
      },
    },
    {
      id: 1,
      emotions: {
        sad: 1,
        happy: 1,
        surprised: 1,
        angry: 1,
        calm: 1,
        afraid: 1,
        disgusted: 1,
        curious: 1,
        guilty: 1,
      },
    },
    {
      id: 2,
      emotions: {
        sad: 5,
        happy: 2,
        surprised: 1,
        angry: 4,
        calm: 3,
        afraid: 2,
        disgusted: 2,
        curious: 4,
        guilty: 2,
      },
    },
  ];

  const [selectedSetIndex, setSelectedSetIndex] = useState(0);

  const displayEmotionSets =
    emotionSets.length > 7 ? emotionSets.slice(-7) : emotionSets;

  const emotions = displayEmotionSets[selectedSetIndex].emotions;

  const getCoordinates = (angle, level) => {
    const radius = level * 20;
    const radians = (Math.PI / 180) * angle;
    const x = 100 + radius * Math.cos(radians);
    const y = 100 - radius * Math.sin(radians);
    return { x, y };
  };

  const levels = [...Array(5)].map((_, levelIndex) => {
    const level = levelIndex + 1;
    const points = [...Array(9)].map((_, i) => {
      const angle = (i / 9) * 360;
      return getCoordinates(angle, level);
    });
    return points;
  });

  const levelPaths = levels.map(
    (levelPoints) =>
      levelPoints
        .map((point, index) => {
          return index === 0
            ? `M ${point.x} ${point.y}`
            : `L ${point.x} ${point.y}`;
        })
        .join(" ") + " Z"
  );

  const emotionKeys = Object.keys(emotions);

  const textPositions = emotionKeys.map((emotion, index) => {
    const angle = (index / emotionKeys.length) * 360;
    const { x, y } = getCoordinates(angle, 6); 
    return { emotion, x, y };
  });

  const points = emotionKeys.map((emotion, index) => {
    const angle = (index / emotionKeys.length) * 360;
    const level = emotions[emotion];
    return { emotion, ...getCoordinates(angle, level) };
  });

  const pathD = useMemo(() => {
    return (
      points
        .map((point, index) => {
          const nextPoint = points[(index + 1) % points.length];
          return index === 0
            ? `M ${point.x} ${point.y}`
            : `L ${point.x} ${point.y}`;
        })
        .join(" ") + " Z"
    );
  }, [points]);

  const getMoodLevelAndColor = (emotions) => {
    const totalScore = Object.values(emotions).reduce(
      (sum, score) => sum + score,
      0
    );

    const moodData = [
      { maxScore: 15, moodLevel: "Very Bad", color: "#FF4757" },
      { maxScore: 21, moodLevel: "Bad", color: "#FF9F43" },
      { maxScore: 27, moodLevel: "Neutral", color: "#FFDC79" },
      { maxScore: 33, moodLevel: "Good", color: "#55EFC4" },
      { maxScore: 39, moodLevel: "Very Good", color: "#48DBFB" },
      { maxScore: Infinity, moodLevel: "Excellent", color: "#A55EEA" },
    ];

    const { moodLevel, color } = moodData.find(
      ({ maxScore }) => totalScore <= maxScore
    );

    return { moodLevel, color };
  };

  const { moodLevel, color } = getMoodLevelAndColor(emotions);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full relative py-10">
<h1
  className="text-xl font-bold mb-4"
  style={{ color: color }}
>
  {`Mood Level: ${moodLevel}`}
</h1>

      <select
        value={selectedSetIndex}
        onChange={(e) => setSelectedSetIndex(parseInt(e.target.value))}
        className="mb-4 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {displayEmotionSets.map((set, index) => (
          <option key={set.id} value={index}>
            Mood Set {set.id}
          </option>
        ))}
      </select>
      <div className="relative w-[200px] h-[200px] mt-6">
        {textPositions.map(({ emotion, x, y }, index) => (
          <p
            key={index}
            className="absolute text-sm font-light capitalize text-cblack-50"
            style={{
              top: `${y}px`,
              left: `${x}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {emotion}
          </p>
        ))}
        <svg width={200} height={200} viewBox="0 0 200 200">
          {levelPaths.map((d, index) => (
            <path
              key={index}
              d={d}
              fill="none"
              stroke="#ddd"
              strokeWidth={1}
              strokeDasharray="4,4"
              strokeLinejoin="round"
            />
          ))}
          <path
            d={pathD}
            fill={color}
            stroke="none"
            opacity={0.4}
            style={{ transition: "d 0.5s ease-in-out" }}
          />
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
            opacity={0.8}
            style={{ transition: "d 0.5s ease-in-out" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Diagram;
