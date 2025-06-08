// -----------------------------------------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MoodSummary from "./MoodSummary";
import WeekMoodEditor from "./WeekMoodEditor";
import QuickStats from "./QuickStats";
import MoodQuote from "./MoodQuote";
import { ColourfulTextDemo } from "./HeaderText";

const MOOD_COLORS = {
  terrible: "#FF6B6B",
  bad: "#FF9F43",
  neutral: "#F7DC6F",
  good: "#58D68D",
  excellent: "#00D2D3",
};

const MOOD_LABELS = {
  terrible: "Terrible",
  bad: "Bad",
  neutral: "Neutral",
  good: "Good",
  excellent: "Excellent",
};

const getPastWeekDates = () => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    dates.push({
      label: d.toDateString(),
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      key,
    });
  }
  return dates;
};

const getMoodsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("mood-tracker") || "{}");
};

const saveMoodToLocalStorage = (key, value) => {
  const moods = getMoodsFromLocalStorage();

  moods[key] = value;
  localStorage.setItem("mood-tracker", JSON.stringify(moods));
};

const Calendar = ({ onMoodChange }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [_, forceUpdate] = useState(0); // for re-rendering
  const [pastWeek] = useState(getPastWeekDates());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);
    setCurrentDate(newDate);
  };

  const setMoodForDate = (mood) => {
    const date = new Date(year, month, selectedDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (date > now) {
      alert("You can't set moods for future days.");
      return;
    }
    const dateKey = `${year}-${month}-${selectedDate}`;
    saveMoodToLocalStorage(dateKey, mood);
    forceUpdate((n) => n + 1);
    onMoodChange?.()
  };

  return (
    <div className="min-h-screen bg-white-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ColourfulTextDemo/>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div id="#Calender" className="xl:col-span-2 bg-white rounded-lg  shadow-sm  border-gray-200 border p-6">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => navigateMonth(-1)}>
                <ChevronLeft />
              </button>
              <h2 className="text-xl font-semibold">{monthName}</h2>
              <button onClick={() => navigateMonth(1)}>
                <ChevronRight />
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-center font-medium text-gray-500">
                  {d}
                </div>
              ))}
              {calendarDays.map((day, i) => {
                const dateKey = `${year}-${month}-${day}`;
                const mood = getMoodsFromLocalStorage()[dateKey];
                const isSelected = selectedDate === day;
                const isFuture = (() => {
                  const date = new Date(year, month, day);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  return date > now;
                })();

                return (
                  <div key={i} className="text-center">
                    {day && (
                      <button
                        disabled={isFuture}
                        onClick={() => !isFuture && setSelectedDate(day)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all 
                          ${
                            isSelected
                              ? "scale-110 shadow-lg text-white"
                              : "text-gray-700"
                          }
                          ${mood ? "" : "hover:bg-gray-100"}
                          ${isFuture ? "cursor-not-allowed opacity-50" : ""}
                        `}
                        style={{
                          backgroundColor: mood
                            ? MOOD_COLORS[mood]
                            : isSelected
                            ? "#3B82F6"
                            : "",
                          color: mood && !isSelected ? "white" : "",
                        }}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mood Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              {Object.entries(MOOD_COLORS).map(([mood, color]) => (
                <button
                  key={mood}
                  onClick={() => setMoodForDate(mood)}
                  className="w-10 h-10 rounded-full shadow hover:scale-110"
                  style={{ backgroundColor: color }}
                  title={MOOD_LABELS[mood]}
                />
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              {selectedDate &&
                (() => {
                  const key = `${year}-${month}-${selectedDate}`;
                  const mood = getMoodsFromLocalStorage()[key];
                  return mood
                    ? `Selected: ${MOOD_LABELS[mood]}`
                    : "Select a mood";
                })()}
            </div>
          </div>

          <MoodQuote mood={getMoodsFromLocalStorage()[`${year}-${month}-${selectedDate}`] || "neutral"}/>
        </div>

        <div className="grid grid-cols-2 mt-10 gap-6 items-center">
          {/* Quick Stats */}
          <QuickStats
            year={year}
            month={month}
            getMoodsFromLocalStorage={getMoodsFromLocalStorage()}
            MOOD_COLORS={MOOD_COLORS}
            MOOD_LABELS={MOOD_LABELS}
          />
          {/* Past Week Mood Editor */}
          <WeekMoodEditor
            MOOD_COLORS={MOOD_COLORS}
            MOOD_LABELS={MOOD_LABELS}
            pastWeek={pastWeek}
            forceUpdate={forceUpdate}
            moodTypes={getMoodsFromLocalStorage()}
          />
        </div>
        <div>
          {/* Mood Summary - Full Width */}
          <MoodSummary
            MOOD_COLORS={MOOD_COLORS}
            MOOD_LABELS={MOOD_LABELS}
            moods={getMoodsFromLocalStorage()}
          />

        </div>
      </div>
    </div>
  );
};

export default Calendar;
