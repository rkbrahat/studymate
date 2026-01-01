# Development Log

## Phase 1: Foundation & Design System

### Step 1.1: Project Initialization
- Created `development_log.md`.
- Initialized `server` directory with Node.js.
- Initialized `client` directory with Vite + React.
- Installed initial dependencies for both environments.
- Configured Tailwind CSS with "Emerald Tech" theme (custom colors, fonts).
- Added Global CSS with glassmorphism utilities.
- Created Atomic Components: `NeonButton`, `TechInput`, `StatusBadge` in `client/src/components/atoms`.
- Created `HomePage.jsx` with Hero section and Feature grid (Phase 1.4).
- Configured React Router in `App.jsx`.
- Added detailed line-by-line documentation to all existing components (`HomePage`, `NeonButton`, `TechInput`, `StatusBadge`).

### Error Log: Tailwind CSS v4 PostCSS Integration
**Error**: `[plugin:vite:css] [postcss] ...`
**Resolution**: Decided to downgrade to Tailwind v3 (Stable) to ensure maximum compatibility with the existing configuration file and prevent experimental API issues.
- Uninstalled v4 packages.
- Installed `tailwindcss@3.4.17`.
- Restored standard `postcss.config.js` and `index.css`.
- Created `CourseCard` molecule (Flexbox layout).
- Created `DashboardPage` (View Only).
- Created `CreateCoursePage` (Form Only).
- Separated routes in `App.jsx` (`/dashboard` and `/create-course`).

## Phase 2: Backend Core
- Initialized `server/.env` (Template).
- Created `server/config/db.js` (MongoDB Connection).
- Created `server/server.js` (Express Entry Point).
- Created `server/models/User.js` (Schema).
- Created `server/models/Course.js` (Schema with embedded Video schema and Immutability flag).
- Installed `bcryptjs` and `jsonwebtoken`.
- Implemented `server/controllers/userController.js` (Register, Login, Generate JWT).
- Created `server/routes/userRoutes.js` and connected them in `server.js`.
- Implemented `server/middleware/authMiddleware.js` (JWT verification).

## Phase 3: Course Logic (Backend)
- Implemented `server/controllers/courseController.js` (Create, Get All, Get One).
- Created `server/routes/courseRoutes.js` and connected in `server.js`.

## Phase 4: Client Integration
- Installed `axios`.
- Created `client/src/services/api.js` (Axios Interceptor).
- Created `client/src/context/AuthContext.jsx` (Global State).
- Wrapped `App.jsx` with `AuthProvider`.
- Created `client/src/pages/LoginPage.jsx` (Handles Login & Register).
- Added `/login` route.
- Connected `DashboardPage` and `CreateCoursePage` to Backend API (`api.get/post`).
- Updated `HomePage` links.

## Phase 5: Player Experience
- Installed `react-player`.
- Created `client/src/pages/CoursePlayerPage.jsx` (Iframe wrapper + Sidebar).
- Added `/course/:id` route.
- Updated `CourseCard` to link to the player.
- Updated `HomePage.jsx` to dynamically link to `/create-course` if logged in, or `/login` if not.
- Implemented `updateVideoStatus` controller and route (Backend).
- Integrated Progress Tracking (Mark as Complete) in `CoursePlayerPage.jsx`.