"use client";
import React from "react";
import { ColourfulText } from "./ui/colourful-text";
import { motion } from "motion/react";

export function ColourfulTextDemo() {
  return (
    <div
      className="h-screen w-full flex items-center justify-center absolute top-0 overflow-hidden">
      <h1
        className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        The best <ColourfulText text="Daily Mood Tracker" /> <br /> you will ever find
      </h1>
    </div>
  );
}
