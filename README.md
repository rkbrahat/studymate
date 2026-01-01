# Custom LMS - "Techy Green" Learning Platform

## 🚀 Project Overview
A custom Learning Management System (LMS) inspired by Udemy's layout but engineered for a pure, distraction-free learning experience. This platform allows users to curate personal courses using YouTube videos while stripping away distractions like ads, recommendations, and clicking rabbit holes.

**Aesthetic:** Modern, High-Tech, Dark Mode with Neon/Emerald Green Accents.

## 🛠 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Lucide React.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose).
- **Authentication:** JWT (JSON Web Tokens).
- **State Management:** React Context + React Query.

## ✨ Core Features
1.  **Distraction-Free Video Player**: Custom wrapper for YouTube videos that hides suggestions and recommendations.
2.  **Course Creator**: Tools to organize individual YouTube videos into structured Courses and Modules.
3.  **Progress Tracking**: specific logic to track completion percentage of courses.
4.  **Modern Dashboard**: "My Learning" and "Created Courses" management.
5.  **Search & Discovery**: Filter and find your curated content easily.

## 📂 Project Structure
```text
custom_lms/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Atomic Architecture (Atoms, Molecules, Organisms)
│   │   ├── pages/              # Main Route Views
│   │   ├── context/            # Global State
│   │   └── services/           # API Connectors
├── server/                     # Node/Express Backend
│   ├── models/                 # Database Schemas
│   ├── routes/                 # API Endpoints
│   └── controllers/            # Logic & Validation
```

## 🗓 Project Roadmap
- **Phase 1: Foundation**: Setup, Design System, Atomic Components.
- **Phase 2: Backend Core**: Auth, Database Connection, User Models.
- **Phase 3: Course Creator**: Schema Design, API, Form UI.
- **Phase 4: Learning Experience**: Custom Video Player, Progress Logic.
- **Phase 5: Dashboard & Polish**: User Dashboard, Animations, Final Review.

## 🚦 Running Locally
1.  **Server**: `cd server` -> `npm run dev`
2.  **Client**: `cd client` -> `npm run dev`
 
