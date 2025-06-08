import React from 'react'

const QuickStats = ({getMoodsFromLocalStorage,year,month, MOOD_COLORS={MOOD_COLORS},MOOD_LABELS={MOOD_LABELS}}) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days Tracked</span>
                <span className="text-lg font-bold text-gray-800">
                  {Object.keys(getMoodsFromLocalStorage).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-lg font-bold text-gray-800">
                  {
                    Object.keys(getMoodsFromLocalStorage).filter((key) => {
                      const [y, m] = key.split("-");
                      return Number(y) === year && Number(m) === month;
                    }).length
                  }
                </span>
              </div>
              {Object.keys(getMoodsFromLocalStorage).length > 0 &&
                (() => {
                  const moods = getMoodsFromLocalStorage;
                  const latestKey = Object.keys(moods)
                    .map((key) => ({
                      key,
                      date: new Date(
                        Number(key.split("-")[0]),
                        Number(key.split("-")[1]),
                        Number(key.split("-")[2])
                      ),
                    }))
                    .sort((a, b) => b.date - a.date)[0]?.key;
                  const latestMood = latestKey ? moods[latestKey] : null;
                  return latestMood ? (
                    <div className="pt-2 border-t">
                      <span className="text-sm text-gray-600">Latest Mood</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: MOOD_COLORS[latestMood] }}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {MOOD_LABELS[latestMood]}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {latestKey &&
                          (() => {
                            const [y, m, d] = latestKey.split("-");
                            const date = new Date(
                              Number(y),
                              Number(m),
                              Number(d)
                            );
                            return date.toDateString();
                          })()}
                      </div>
                    </div>
                  ) : null;
                })()}
            </div>
          </div>
    </div>
  )
}

export default QuickStats