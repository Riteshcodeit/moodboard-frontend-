import React, { useState } from 'react';
import { MOOD_COLORS } from '../utils/moodPalette';

const getMoodDistribution = (moods) => {
  const counts = {};
  let total = 0;

  Object.values(moods).forEach((mood) => {
    counts[mood] = (counts[mood] || 0) + 1;
    total++;
  });

  return { counts, total };
};

const getArcPath = (cx, cy, r, startAngle, endAngle) => {
  const x1 = cx + r * Math.cos((Math.PI * startAngle) / 180);
  const y1 = cy + r * Math.sin((Math.PI * startAngle) / 180);
  const x2 = cx + r * Math.cos((Math.PI * endAngle) / 180);
  const y2 = cy + r * Math.sin((Math.PI * endAngle) / 180);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
};

const MoodPieChart = () => {
  const moods = JSON.parse(localStorage.getItem('mood-tracker') || '{}');
  const { counts, total } = getMoodDistribution(moods);
  const [hoveredMood, setHoveredMood] = useState(null);

  if (total === 0) {
    return <p className="text-center text-gray-500 mt-6">No mood data available</p>;
  }

  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;
  let startAngle = 0;

  return (
    <div className="w-full max-w-xl mx-auto mt-10 px-4">
      <h3 className="text-xl font-semibold mb-4 text-center">Mood Distribution</h3>

      <div className="relative" style={{ width: '60%', paddingBottom: '60%' }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="absolute top-0 left-0 ml-28 w-full h-full"
        >
          {Object.entries(counts).map(([mood, count], index) => {
            const percentage = count / total;
            const angle = percentage * 360;
            const endAngle = startAngle + angle;
            const path = getArcPath(cx, cy, r, startAngle, endAngle);
            const color = MOOD_COLORS[mood] || '#ccc';

            const slice = (
              <path
                key={index}
                d={path}
                fill={color}
                stroke="#fff"
                strokeWidth="1"
                style={{
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  opacity: hoveredMood && hoveredMood !== mood ? 0.5 : 1,
                }}
                onMouseEnter={() => setHoveredMood(mood)}
                onMouseLeave={() => setHoveredMood(null)}
              />
            );

            startAngle = endAngle;
            return slice;
          })}
        </svg>

        {hoveredMood && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded shadow text-sm font-medium text-gray-700 border">
            {hoveredMood}: {counts[hoveredMood]} (
            {((counts[hoveredMood] / total) * 100).toFixed(1)}%)
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center mt-6 gap-4">
        {Object.entries(counts).map(([mood, count], index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: MOOD_COLORS[mood] }}
            />
            <span>{mood} ({count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodPieChart;
