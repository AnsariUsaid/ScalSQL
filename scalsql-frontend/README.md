# ScalSQL — AI-Powered SQL Cloud Architect

> **Transform natural language into production-ready SQL** using AWS SageMaker, Lambda, and RDS — all from a stunning cyber-themed dashboard.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-E91E63?logo=framer&logoColor=white)

---

## ✨ Features

- **Natural Language → SQL** — Type what you need in plain English, get optimized SQL back instantly
- **AWS Cloud Architecture** — SageMaker for AI inference, Lambda for serverless processing, RDS for database execution
- **Multi-Database Support** — PostgreSQL, MySQL, Aurora — connect and query any AWS RDS instance
- **Schema Auto-Detection** — Automatically reads your table structures to generate accurate queries
- **Query History & Analytics** — Track all past queries, execution times, and performance metrics
- **Role-Based Access Control** — Admin panel with user management and organization-level permissions
- **Real-Time Dashboard** — Live stats on query latency, accuracy scores, and system uptime

---

## 🎨 UI / Design

The frontend features a **premium cyber-noir aesthetic** with:

| Component | Tech |
|---|---|
| WebGL Shader Hero | Custom GLSL fragment shader (plasma wave) |
| Tubelight Navbar | Framer Motion spring-animated active indicator |
| 3D Architecture Diagram | Mouse-parallax with Framer Motion `useSpring` |
| LaserFlow CTA | WebGL shader with fog, wisps, and beam effects |
| Animated Pricing | `BorderTrail` orbit animation + frequency toggle |
| Display Cards | Stacked hover-reveal with grayscale transitions |
| Glass Cards | `backdrop-blur` glassmorphism throughout |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion 12 |
| **Icons** | Lucide React |
| **UI Primitives** | Radix UI (Tooltip, Slot) |
| **Routing** | React Router DOM 7 |
| **Graphics** | WebGL (custom GLSL shaders) |
| **Backend** | Node.js + Express |
| **Cloud** | AWS SageMaker, Lambda, RDS, S3 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/AnsariUsaid/ScalSQL.git
cd ScalSQL

# Install frontend dependencies
cd scalsql-frontend
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Backend (Optional)

```bash
cd scalsql-backend
npm install
npm run dev
```

---

## 📁 Project Structure

```
scalsql-frontend/
├── src/
│   ├── components/ui/       # Reusable UI components
│   │   ├── shader-background.jsx   # WebGL hero shader
│   │   ├── laser-flow.jsx          # WebGL laser CTA effect
│   │   ├── cyber-architecture.jsx  # 3D architecture diagram
│   │   ├── tubelight-navbar.jsx    # Animated navbar
│   │   ├── display-cards.jsx       # Stacked feature cards
│   │   ├── pricing.jsx             # Pricing section + BorderTrail
│   │   ├── button.jsx              # shadcn-style Button
│   │   └── tooltip.jsx             # shadcn-style Tooltip
│   ├── layouts/
│   │   └── DashboardLayout.jsx     # Sidebar + main content shell
│   ├── pages/
│   │   ├── LandingPage.jsx         # Public marketing page
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   ├── QueryGenerator.jsx      # NL → SQL interface
│   │   ├── QueryResults.jsx        # Data table + export
│   │   ├── QueryHistory.jsx        # Past queries log
│   │   ├── DatabaseConfig.jsx      # RDS connection manager
│   │   ├── Analytics.jsx           # Performance monitoring
│   │   ├── AdminPanel.jsx          # User/role management
│   │   └── Settings.jsx            # Profile & API keys
│   ├── lib/
│   │   └── utils.js                # cn() class merge utility
│   └── index.css                   # Global styles + animations
├── tailwind.config.js
└── vite.config.js
```

---

## 📜 License

MIT © [Usaid Ansari](https://github.com/AnsariUsaid)
