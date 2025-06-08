# 🌈 MoodBoard: Daily Mood Tracker

🔗 **Live Demo:** [MoodBoard App](https://moodboardtracker.netlify.app/)

MoodBoard is a beautiful and intuitive web app that allows users to track their daily moods, visualize emotional trends, and gain insights through summaries, charts, and motivational quotes. Built with React, this tool is perfect for self-awareness and emotional well-being.

---

## 🖼️ Screenshot

![MoodBoard UI](./![Screenshot 2025-06-08 191538](https://github.com/user-attachments/assets/62763027-0914-4876-bc01-072b3de779f4)
)  
![Screenshot 2025-06-08 191325](https://github.com/user-attachments/assets/1904e20c-1f4d-4b04-9f21-ef3b9eb91368)
![Screenshot 2025-06-08 191339](https://github.com/user-attachments/assets/11352117-9c67-41c7-8270-7325ec573f1a)
![Screenshot 2025-06-08 191815](https://github.com/user-attachments/assets/69637896-8ead-4c73-a396-2c12fe7f92a0)


---

## 🚀 Project Features

- ✅ **Daily Mood Selection** — Choose your mood from emojis or categories (e.g., Happy, Neutral, Sad).
- 📆 **Mood Calendar** — Color-coded calendar for easy visualization of your emotional journey.
- 📊 **Custom Pie Chart (No Library)** — View a dynamic pie chart showing mood distribution for the week.
- 🧘 **Mood Quote of the Day** — Auto-updated motivational quote based on your mood.
- ⚡ **Quick Stats** — Weekly mood breakdown and quick insights.
- 📝 **Mood Summary** — Summary view for the current week's moods.
- 🌐 **Responsive UI** — Designed for both mobile and desktop.

---

## 🛠️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/moodboard.git
   cd moodboard
   npm install
   npm run dev

(Optional) Setup Environment Variables
If using an API like NINJA_API for mood quotes:

Create a .env file

Add your API key or proxy link if needed
📦 Tech Stack
Frontend: React, TailwindCSS, Lucide Icons,aceternityUI

State Management: useState, useEffect

Storage: localStorage for mood history

API: api-Ninjas.com (for daily quotes)

📬 API Overview
GET /quote
Fetches the mood-based quote of the day.

Example:

js
Copy
Edit
fetch("https://api-ninjas.com/api")
Returns:

```bash
[
  {
    "q": "Happiness is not something ready made. It comes from your own actions.",
    "a": "Dalai Lama"
  }
]

```
📄 License
MIT

Made with ❤️ by Ritesh
