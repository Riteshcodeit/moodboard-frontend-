import { useState } from "react";
import Calendar from "./components/Calendar";
import MoodBackground from "./components/MoodBackground";
import Navbar from "./components/Navbar";

function App() {
  const [moodTrigger, setMoodTrigger] = useState(0);

  const handleMoodChanged = () => {
    setMoodTrigger((prev) => prev + 1);
  };
  return (
    <div>
      <MoodBackground moodChangeTrigger={moodTrigger}>
      <Navbar />
        <Calendar onMoodChange={handleMoodChanged} />
      </MoodBackground>
    </div>
  );
}

export default App;
