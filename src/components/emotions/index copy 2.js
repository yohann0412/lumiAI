'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Typography, Box } from '@mui/material';

const EmotionVisualizer = ({ emotions }) => {
    const colors = [
        '#A9D6E5', '#90E0EF', '#CAF0F8', '#ADE8F4', '#D9ED92', '#B5E48C',
        '#76C893', '#34A0A4', '#168AAD', '#1A759F', '#184E77', '#DDE5B6',
        '#F9DCC4', '#E8A598', '#F4BFBF', '#B8C0FF', '#D6A2E8', '#E2C2CF'
      ];

  const totalMessages = Object.values(emotions).reduce((acc, count) => acc + count, 0);
  const data = Object.keys(emotions).map((emotion, index) => ({
    name: emotion,
    value: emotions[emotion],
    color: colors[index % colors.length],
  }));

  return (
    <Card
      style={{
        padding: '1.5rem',
        borderRadius: '16px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
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
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            dataKey="value"
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Box mt={2} display="flex" flexDirection="row" alignItems="flex-end" justifyContent="center" flexWrap="wrap">
  {data.map(({ name, value, color }) => (
    <Box
      key={name}
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ margin: '0 4px' }}
    >
      <Box
        sx={{
          width: 16, // Уменьшенная ширина
          height: (value / totalMessages) * 120, // Уменьшенная высота
          backgroundColor: color,
          borderRadius: '8px', // Уменьшенный радиус
        }}
        title={`${name}: ${Math.round((value / totalMessages) * 100)}%`}
      />
      <Typography
        variant="caption" // Используем меньший шрифт
        style={{
          fontWeight: 500,
          color: '#555',
          marginTop: '4px', // Уменьшенный отступ
          textAlign: 'center',
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="caption" // Используем меньший шрифт
        style={{
          fontWeight: 400,
          color: '#888',
          marginTop: '2px', // Уменьшенный отступ
        }}
      >
        {Math.round((value / totalMessages) * 100)}%
      </Typography>
    </Box>
  ))}
</Box>

    </Card>
  );
};

export default EmotionVisualizer;
