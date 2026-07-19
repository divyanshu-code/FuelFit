# FuelFit Frontend 

Welcome to the **FuelFit Frontend** repository! This application is built with modern web technologies to deliver a premium, highly interactive, and energetic user experience for tracking nutrition and fitness goals.

## Tech Stack

- **Framework**: React (Bootstrapped with Vite)
- **Styling**: Tailwind CSS (Custom configured with a vibrant Green & Orange brand palette)
- **Animations**: 
  - Framer Motion (for physics-based micro-interactions, modal springs, and typing effects)
  - GSAP (for scroll-triggered animations and responsive side-drawers)
- **Routing**: React Router DOM (with protected and public route handling)
- **HTTP Client**: Axios (for communicating with the backend API)
- **Icons**: React Icons (Fa, Md, Rx sets)
- **Notifications**: React Toastify (Custom styled alerts)

---

## Project Structure & Pages

The application is structured into clearly separated pages and reusable components.

### 1. Landing & Authentication
- **`/` (Home / Landing Page)**
  - A premium, animated landing page featuring a dynamic mesh background, floating metric cards, and a smooth scroll-to-section navigation system.
  - Showcases the application's core features (About, Features, Contact).
- **`/login` & `/signup`**
  - Secure authentication portals with floating labels, error handling, and smooth page transitions.
  - Upon successful login, the application checks if the user has completed onboarding before routing them appropriately.

### 2. Onboarding Flow
- **`/details` (FitnessDetail.jsx)**
  - A glassmorphism-styled onboarding form.
  - Collects essential user metrics: **Age, Gender, Weight, Height, Meal Preference, and Fitness Goal**.
  - Users *must* complete this step before accessing the main dashboard.

### 3. The Dashboard (User Hub)
- **`/:username` (Profile.jsx)**
  - The central hub for authenticated users. It intelligently manages session states and aggregates several sub-components:
  - **Profile Banner**: Displays the user's avatar, active fitness goal, and dynamic streak count.
  - **Nutrition Tracker**: Fetches healthy meals dynamically via the Edamam API, calculates daily macros (Protein, Carbs, Fats, Calories), and allows users to check off meals to build their daily streak.
  - **BMI Calculator**: Automatically calculates and categorizes the user's Body Mass Index in real-time based on their onboarding metrics.
  - **Exercise Suggestions (Blog)**: Dynamically renders tailored workout routines (e.g., "Muscle Gain" vs "Fat Loss") based on the user's selected goal.
  - **Help / Progress**: Visualizes the user's historical progress and consistency.

### 4. Interactive Global Components
- **FAQ Chat Widget (`FAQSection.jsx`)**
  - A floating chat bubble that opens an interactive, AI-styled FAQ widget.
  - Features a custom `Typewriter` effect and bouncing "thinking" dots for a highly engaging user experience.
- **Feedback Modal (`Feedback.jsx`)**
  - A premium modal featuring a 5-star interactive rating system.
  - Connected directly to the backend to email user feedback (via Nodemailer) directly to the FuelFit Admin.
- **Navigation (`Navbar` & `ProfileNavbar`)**
  - Dynamic navigation bars that adapt to scroll state.
  - Features GSAP-powered mobile sliding drawers and dynamic dropdown menus for account management.
- **Dynamic Backgrounds (`ParticleCanvas`)**
  - Custom HTML5 Canvas animations running in the background to give the application an energetic, "living" feel.

---

## Design Philosophy

FuelFit strictly adheres to a **Premium & Energetic** design language:
- **Glassmorphism**: Extensive use of translucent backgrounds (`backdrop-blur`) over dynamic colorful meshes.
- **Micro-interactions**: Every button, input, and card reacts to user hover states (scale, transform, border glow).
- **Color Palette**: 
  - `brandGreen` (#3AA33A): Represents health, growth, and success states.
  - `brandOrange` (#F2803D): Represents energy, calories burned, and primary calls-to-action.
  - `slate`: Used for high-contrast, premium dark accents (e.g., chat bubbles, submit buttons).

---

## Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of the `Frontend` directory with the following variables:
   ```env
   VITE_EDAMAM_APP_ID=your_edamam_app_id
   VITE_EDAMAM_APP_KEY=your_edamam_app_key
   ```
   *(Note: The backend URL is currently configured via the `DataContext` provider).*

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be served at `http://localhost:5173`.
