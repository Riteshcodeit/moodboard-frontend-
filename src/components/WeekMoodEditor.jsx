import { Trash } from "lucide-react";
import React from "react";

const WeekMoodEditor = ({ moodTypes, pastWeek, MOOD_COLORS, MOOD_LABELS,forceUpdate }) => {
  const deleteMoodFromLocalStorage = (key) => {
    const moods = moodTypes;
    delete moods[key];
    localStorage.setItem("mood-tracker", JSON.stringify(moods));
  };
  const saveMoodToLocalStorage = (key, value) => {
  const moods =moodTypes;

  moods[key] = value;
  localStorage.setItem("mood-tracker", JSON.stringify(moods));
};

  return (
    <div>
      <div className="bg-white rounded-lg  shadow-sm  border-gray-200 border p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Edit Past Week’s Moods</h3>
        {pastWeek.map(({ label, key }) => {
          const moods = moodTypes;
          return (
            <div key={key} className="flex justify-between items-center mb-3">
              <span className="text-sm">{label}</span>
              <div className="flex items-center gap-2">
                {Object.entries(MOOD_COLORS).map(([mood, color]) => (
                  <button
                    key={mood}
                    onClick={() => {
                      saveMoodToLocalStorage(key, mood);
                      forceUpdate((n) => n + 1);
                    }}
                    className={`w-6 h-6 rounded-full border-2 ${
                      moods[key] === mood
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                    title={MOOD_LABELS[mood]}
                  />
                ))}
                <button
                  onClick={() => {
                    deleteMoodFromLocalStorage(key);
                    forceUpdate((n) => n + 1);
                  }}
                  className=" text-red-600"
                >
                  <Trash className="w-5 pl-1 cursor-pointer hover:fill-red-600"/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekMoodEditor;
