# ⚡ LinkLite

> **Clean up messy links. Track every click. Move fast.**

A premium, full-stack URL shortener built to convert long, cumbersome URLs into sleek, shareable links. Features a beautiful glassmorphism UI, integrated dark mode, and real-time click analytics.

-----

## ✨ Features

  - 🌙 **Dark Mode Toggle** — Sleek Sun/Moon toggle that remembers your system preference
  - 🔗 **Custom Aliases** — Claim your own branded links (e.g., `linklite.com/my-portfolio`)
  - 📊 **Analytics Dashboard** — Track total clicks and "last accessed" timestamps for every link
  - ⚡ **Instant Redirects** — Lightning-fast routing powered by Express.js
  - 🎨 **Premium UI** — Glassmorphism design, animated gradients, and responsive layouts
  - 🛡️ **Collision-Free IDs** — Auto-generates secure, unique 6-character IDs using `nanoid`
  - ☁️ **Cloud Database** — Persistent, reliable storage via MongoDB Atlas

-----

## 🌐 Live Demo

🔗 **Frontend:** **[linklite.vercel.app](https://link-lite-frontend.vercel.app/)** *(Update with your actual Vercel link)*<br>
⚙️ **Backend API:** **[linklite-backend.onrender.com](https://linklite-fullstack.onrender.com)** *(Update with your actual Render link)*

-----

## 🚀 How It Works

```text
User pastes a long URL (+ optional custom alias)
       ↓
React Frontend sends POST request to Node API
       ↓
Backend checks alias availability / generates short ID
       ↓
MongoDB stores { originalUrl, shortId, clicks: 0 }
       ↓
Frontend displays ready-to-copy Short Link 🎉
       ↓
Visitor clicks link → Backend tallies +1 click → Redirects! 🚀
```

-----

## 🎨 Design

  - **Style:** Modern Glassmorphism — frosted white/slate cards on gradient backgrounds
  - **Themes:** Fully configured Tailwind Dark Mode (Midnight Indigo/Slate)
  - **Icons:** Lucide-React
  - **Animations:** Smooth state transitions, loading spinners, and pulse effects
  - **Mobile First:** Fully responsive across all devices

-----

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 + Vite | Frontend framework & build tool |
| Tailwind CSS | Utility-first styling & Dark Mode |
| Node.js + Express | Backend server & API routing |
| MongoDB Atlas | Cloud NoSQL database |
| Mongoose | Object Data Modeling (ODM) |
| Nanoid | Unique short-link ID generation |
| Vercel | Frontend deployment |
| Render | Backend deployment |

-----

## 📁 Project Structure (Mono-Repo)

```text
LinkLite-Fullstack/
├── linklite/                 ← Frontend React App
│   ├── src/
│   │   ├── LinkShortener.jsx ← Main generator UI
│   │   ├── Analytics.jsx     ← Stats dashboard
│   │   └── Redirector.jsx    ← Handles routing logic
│   ├── tailwind.config.js
│   └── package.json
├── linklite-backend/         ← Backend Node/Express API
│   ├── models/
│   │   └── Url.js            ← MongoDB Schema
│   ├── index.js              ← Core server logic
│   ├── .env                  ← Database keys (Not committed)
│   └── package.json
└── README.md
```

-----

## ⚙️ Getting Started

### Prerequisites

  - Node.js v18+
  - npm v9+
  - MongoDB Atlas account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/shivanshgupta01/LinkLite-Fullstack.git

# Navigate into the project
cd LinkLite-Fullstack
```

### 1\. Backend Setup

```bash
cd linklite-backend
npm install
```

Create a `.env` file inside `linklite-backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Start the server:

```bash
node index.js
```

### 2\. Frontend Setup

Open a new terminal window:

```bash
cd linklite
npm install
```

Create a `.env` file inside `linklite`:

```env
VITE_API_URL=http://localhost:5000
```

Run the app locally:

```bash
npm run dev
```

Open [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173) ✅

-----

## 🚀 Deployment

### Backend (Render)

1.  Go to **Render.com** and create a New Web Service.
2.  Connect this GitHub repository.
3.  Set **Root Directory** to `linklite-backend`.
4.  Add your `MONGO_URI` in the Environment Variables tab.
5.  Deploy\!

### Frontend (Vercel)

1.  Go to **Vercel.com** and import this repository.
2.  Set **Root Directory** to `linklite`.
3.  Add `VITE_API_URL` to Environment Variables (pointing to your new Render URL).
4.  Deploy\! ✅

-----

## 🔐 Security Notes

  - All Database URIs and API keys are stored in `.env` variables and are **never** committed to GitHub.
  - `.env` and `node_modules` are strictly ignored via `.gitignore`.
  - CORS policy is configured to allow secure communication between the deployed frontend and backend.

-----

## 🗺️ Roadmap

  - [ ] QR Code generation for every shortened link
  - [ ] Password-protected links for extra security
  - [ ] Link expiration dates (Self-destructing links)
  - [ ] Advanced Geolocation analytics for clicks
  - [ ] User authentication to save links to specific accounts

-----

## 🏗️ Part of 30 Days Mini Projects

This app is **Day 06** of my **30 Days Mini Projects** challenge — building one web app every day.

| Day | Project | Status |
|---|---|---|
| 01 | Daily Habit Tracker | ✅ Live |
| 02 | Skill Progress Tracker | ✅ Live |
| 03 | Focus Timer | ✅ Live |
| 04 | Accountability Board | ✅ Live |
| 05 | *Previous Project* | ✅ Live |
| 06 | LinkLite Full-Stack | ✅ Live |

-----

## 👨‍💻 Author

**Shivansh Gupta**

  - Instagram: [@flowkraftai](https://www.instagram.com/flowkraftai)
  - GitHub: [@shivanshgupta01](https://github.com/shivanshgupta01)
  - LinkedIn [@shivanshfinance](https://www.linkedin.com/in/shivanshfinance)

-----

## 📄 License

MIT License — free to use, modify, and distribute.

-----

\<p align="center"\>Built with ❤️ by Shivansh Gupta\</p\>
\<p align="center"\>⭐ Star this repo if you found it useful\!\</p\>
