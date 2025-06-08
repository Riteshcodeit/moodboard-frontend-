import React, { useEffect, useState } from 'react';
import { MOOD_COLORS } from '../utils/moodPalette';
import { motion } from "motion/react";


const MoodBackground = ({ children, moodChangeTrigger }) => {
  const [background, setBackground] = useState(MOOD_COLORS.default);

  const getMoodColor = () => {
    const today = new Date();
    const key = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const moodData = JSON.parse(localStorage.getItem('mood-tracker') || '{}');
    const mood = moodData[key] || 'default';
    return MOOD_COLORS[mood] || MOOD_COLORS.default;
  };

  useEffect(() => {
    setBackground(getMoodColor());
  }, [moodChangeTrigger]);

  return (
    <div
      style={{
        backgroundColor: background,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      <motion.img
        src="https://assets.aceternity.com/linear-demo.webp"
        className="h-screen w-full object-cover  inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }} />
      {children}
    </div>
  );
};

export default MoodBackground;
