'use client';

import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const floatAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-10px) translateX(5px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
`;

const EmotionVisualizer = ({ emotions }) => {
  const totalMessages = Object.values(emotions).reduce((acc, count) => acc + count, 0);
  const data = Object.keys(emotions).map((emotion, index) => {
    // Рассчитываем радиус пузыря на основе доли эмоции
    const ratio = totalMessages > 0 ? emotions[emotion] / totalMessages : 0;
    return {
      name: emotion,
      value: emotions[emotion],
      ratio
    };
  });

  return (
    <Card
      style={{
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Typography
        variant="h5"
        style={{
          textAlign: 'center',
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Emotional Insights
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        style={{ position: 'relative', height: '400px' }}
      >
        {data.map(({ name, value, ratio }, i) => {
          // Размер пузыря, можно подкорректировать для визуального эффекта
          const size = 50 + ratio * 200;
          // Подбираем мягкий, пастельный оттенок
          // Здесь можно использовать разные оттенки для разных эмоций, 
          // например, на основе индекса (но лучше сделать плавные пастельные цвета)
          const hue = (i * 40) % 360;
          const color = `hsl(${hue}, 100%, 80%)`;

          // Позиция пузыря будет рандомной, чтобы они не пересекались слишком сильно
          const randomX = Math.random() * 70 + 15; // от 15% до 85%
          const randomY = Math.random() * 70 + 15; // от 15% до 85%

          return (
            <Box
              key={name}
              sx={{
                position: 'absolute',
                top: `${randomY}%`,
                left: `${randomX}%`,
                width: size,
                height: size,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `${floatAnimation} ${3 + Math.random()*2}s ease-in-out infinite`,
                // Стиль под "мыльный пузырь": 
                // полупрозрачный градиент + блики, чтобы был эффект объема
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%), ${color}`,
                boxShadow: '0px 0px 10px rgba(0,0,0,0.1), inset 0px 0px 10px rgba(255,255,255,0.5)'
              }}
              title={`${name}: ${Math.round(ratio * 100)}%`}
            >
              <Typography
                variant="subtitle2"
                style={{
                  color: '#333',
                  fontWeight: 600,
                  textShadow: '0px 0px 5px rgba(255,255,255,0.7)',
                  fontSize: '0.75rem',
                  textAlign: 'center'
                }}
              >
                {name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default EmotionVisualizer;
