'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Box, Typography } from '@mui/material';

const EmotionVisualizer = ({ emotions }) => {
  const colors = [
    '#A0C4FF', '#BDB2FF', '#FFC6FF', '#FFADAD', '#FFD6A5', '#FDFFB6',
    '#CAFFBF', '#9BF6FF', '#A0E7E5', '#B4F8C8', '#FBE7C6', '#FF9CEE',
    '#D4A5FF', '#FFCCD5', '#FDE2E4', '#C1E1C1', '#A7BED3', '#D5AAFF'
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
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        backgroundColor: '#F7F8FA',
      }}
    >
      <Typography
        variant="h5"
        style={{
          textAlign: 'center',
          fontWeight: 500,
          marginBottom: '1rem',
          color: '#444',
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
      <Box mt={3}>
        {data.map(({ name, value, color }) => (
          <Box
            key={name}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={1.5}
          >
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: color,
                  borderRadius: '50%',
                  marginRight: 1,
                }}
              />
              <Typography
                variant="body2"
                style={{ fontWeight: 500, color: '#666' }}
              >
                {name}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              style={{ fontWeight: 400, color: '#999' }}
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
