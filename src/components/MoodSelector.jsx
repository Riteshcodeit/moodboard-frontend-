
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Bell, User } from "lucide-react";

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


const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [moods, setMoods] = useState({});
  const [selectedMood, setSelectedMood] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + direction);
    setCurrentDate(newDate);
  };

  const selectDate = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  const setMoodForDate = (mood) => {
    if (selectedDate) {
      setMoods((prev) => ({
        ...prev,
        [selectedDate]: mood,
      }));
      setSelectedMood(null);
    }
  };

  return (
    <div className="min-h-screen bg-white-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left">
          Daily Mood Tracker
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>

                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
                  {monthName}
                </h2>

                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <div
                    key={index}
                    className="h-8 sm:h-10 lg:h-12 flex items-center justify-center"
                  >
                    <span className="text-xs sm:text-sm font-medium text-gray-500">
                      {day}
                    </span>
                  </div>
                ))}

                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className="h-8 sm:h-10 lg:h-12 flex items-center justify-center"
                  >
                    {day && (
                      <button
                        onClick={() => selectDate(day)}
                        className={`
                          w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center 
                          text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-110
                          ${
                            selectedDate === day
                              ? moods[day]
                                ? "text-white shadow-lg transform scale-110"
                                : "bg-blue-500 text-white shadow-lg transform scale-110"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                        `}
                        style={
                          selectedDate === day && moods[day]
                            ? { backgroundColor: MOOD_COLORS[moods[day]] }
                            : moods[day] && selectedDate !== day
                            ? {
                                backgroundColor: MOOD_COLORS[moods[day]],
                                color: "white",
                              }
                            : {}
                        }
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="xl:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                Select Your Mood
              </h3>

              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
                {Object.entries(MOOD_COLORS).map(([mood, color]) => (
                  <button
                    key={mood}
                    onClick={() => setMoodForDate(mood)}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-200 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-30"
                    style={{
                      backgroundColor: color,
                      focusRingColor: color + "30",
                    }}
                    title={MOOD_LABELS[mood]}
                  />
                ))}
              </div>

              {selectedDate && (
                <p className="text-xs sm:text-sm text-gray-600 mt-3 text-center sm:text-left">
                  {moods[selectedDate]
                    ? `Selected mood for ${
                        monthName.split(" ")[0]
                      } ${selectedDate}: ${MOOD_LABELS[moods[selectedDate]]}`
                    : `Select a mood for ${
                        monthName.split(" ")[0]
                      } ${selectedDate}`}
                </p>
              )}
            </div>
          </div>

          <div className="hidden xl:block space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Your Mood
              </h3>

              <div className="flex flex-col space-y-3">
                {Object.entries(MOOD_COLORS).map(([mood, color]) => (
                  <button
                    key={mood}
                    onClick={() => setMoodForDate(mood)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title={MOOD_LABELS[mood]}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {MOOD_LABELS[mood]}
                    </span>
                  </button>
                ))}
              </div>

              {selectedDate && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {moods[selectedDate]
                      ? `${monthName.split(" ")[0]} ${selectedDate}: ${
                          MOOD_LABELS[moods[selectedDate]]
                        }`
                      : `Select mood for ${
                          monthName.split(" ")[0]
                        } ${selectedDate}`}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Stats
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Days Tracked</span>
                  <span className="text-lg font-bold text-gray-800">
                    {Object.keys(moods).length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-lg font-bold text-gray-800">
                    {Object.keys(moods).length}
                  </span>
                </div>

                {Object.keys(moods).length > 0 && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-600">Latest Mood</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            MOOD_COLORS[
                              Object.values(moods)[
                                Object.values(moods).length - 1
                              ]
                            ],
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {
                          MOOD_LABELS[
                            Object.values(moods)[
                              Object.values(moods).length - 1
                            ]
                          ]
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          id="summary"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mt-4 sm:mt-6 lg:mt-8"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Mood Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Days Tracked
              </h4>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700">
                {Object.keys(moods).length}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 mt-1">
                This month
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Current Streak
              </h4>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700">
                {Object.keys(moods).length > 0
                  ? Math.min(Object.keys(moods).length, 7)
                  : 0}
              </p>
              <p className="text-xs sm:text-sm text-green-600 mt-1">
                Days in a row
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Average Mood
              </h4>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                  style={{
                    backgroundColor:
                      Object.keys(moods).length > 0
                        ? MOOD_COLORS[Object.values(moods)[0]]
                        : "#gray",
                  }}
                />
                <p className="text-sm sm:text-base font-medium text-purple-700">
                  {Object.keys(moods).length > 0
                    ? MOOD_LABELS[Object.values(moods)[0]]
                    : "No data"}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Most Common
              </h4>
              {Object.keys(moods).length > 0 ? (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{
                      backgroundColor: MOOD_COLORS[Object.values(moods)[0]],
                    }}
                  />
                  <p className="text-sm sm:text-base font-medium text-amber-700">
                    {MOOD_LABELS[Object.values(moods)[0]]}
                  </p>
                </div>
              ) : (
                <p className="text-sm sm:text-base text-amber-600">
                  No data yet
                </p>
              )}
            </div>
          </div>

          {Object.keys(moods).length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-4 text-sm sm:text-base">
                Mood Distribution
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(MOOD_LABELS).map(([mood, label]) => {
                  const count = Object.values(moods).filter(
                    (m) => m === mood
                  ).length;
                  const percentage = (count / Object.keys(moods).length) * 100;

                  return (
                    <div key={mood} className="text-center">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: MOOD_COLORS[mood] }}
                      />
                      <p className="text-xs sm:text-sm font-medium text-gray-700">
                        {label}
                      </p>
                      <p className="text-xs text-gray-500">{count} days</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: MOOD_COLORS[mood],
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
