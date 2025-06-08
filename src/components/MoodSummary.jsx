import React from 'react'
import MoodPieChart from './MoodPieChart';

const MoodSummary = ({moods,MOOD_COLORS,MOOD_LABELS}) => {
  const moodValues = Object.values(moods);
  const moodCounts = moodValues.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  let averageMood = null;
  if (moodValues.length > 0) {
    const moodKeys = Object.keys(MOOD_LABELS);
    const moodIndexes = moodValues.map((m) => moodKeys.indexOf(m)).filter(i => i !== -1);
    const avgIndex = Math.round(
      moodIndexes.reduce((sum, idx) => sum + idx, 0) / moodIndexes.length
    );
    averageMood = moodKeys[avgIndex];
  }

  let mostCommonMood = null;
  if (moodValues.length > 0) {
    mostCommonMood = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b
    );
  }

  return (
    <div>
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
                      averageMood && MOOD_COLORS[averageMood]
                        ? MOOD_COLORS[averageMood]
                        : "#ccc",
                  }}
                />
                <p className="text-sm sm:text-base font-medium text-purple-700">
                  {averageMood
                    ? MOOD_LABELS[averageMood]
                    : "No data"}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 ">
              <h4 className="font-medium text-gray-700 mb-2 text-sm sm:text-base">
                Most Common
              </h4>
              {mostCommonMood ? (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{
                      backgroundColor: MOOD_COLORS[mostCommonMood],
                    }}
                  />
                  <p className="text-sm sm:text-base font-medium text-amber-700">
                    {MOOD_LABELS[mostCommonMood]}
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
                  const count = moodValues.filter(
                    (m) => m === mood
                  ).length;
                  const percentage = (count / moodValues.length) * 100;

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
        <MoodPieChart/>
        </div>
    </div>
  )
}

export default MoodSummary