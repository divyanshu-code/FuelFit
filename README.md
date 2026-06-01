## FuelFit – Your Personal Fitness Guide
**FuelFit** is a full-stack fitness tracking application designed to help you stay consistent on your health journey.
It allows users to set their fitness goals, monitor daily nutrition, track progress, and receive personalized meal suggestions based on their preferences.

## Inspiration Behind FuelFit
The idea for FuelFit came from observing a common struggle in the gym — especially among beginners.
After a workout, many new members would often ask: 

 **“What should I eat now?”**

 **“Is this food good for my body ?”**

With so many food options available in the market, beginners easily get confused about what to eat, when to eat, and how much to eat. Seeing this confusion regularly, I thought:

**Why not build something that gives personalized meal suggestions based on fitness goals?**

That's how **FuelFit** was born — a platform that automatically provides daily meal recommendations, tracking progress based on individual goals and preferences.

FuelFit helps users know exactly what to eat and when to eat so they can stay consistent and focused on their fitness journey.

## Key Features
FuelFit provide you these following feature :-
- **Goal-based fitness tracking :** Set your fitness goals and let FuelFit guide your daily journey.
- **Nutrition monitoring :** Track your daily meals, calories, and macros with ease.
- **Personalized meal suggestions :** Receive smart, customizable meal recommendations based on your dietary preferences.
- **Daily progress insight :** Visual representation through calender to help you stay on track and improve consistency.
- **Secure authentication :** Fully protected user data using JWT-based auth.

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Context API 
- Framer Motion
- GSAP

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

**Tools & Deployment**
- Render 
- Git & GitHub
- Postman

## Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud option)
- **Git** - [Download here](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FuelFit.git
   cd FuelFit
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   MONGO_URI=mongodb://localhost:27017/fuelfit
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

   Create a `.env` file in the `frontend` directory:
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Run the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The server will start on `http://localhost:5000`

7. **Run the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   The app will open at `http://localhost:3000`

### Building for Production

**Frontend Build**
```bash
cd frontend
npm run build
```

**Backend Deployment**
Follow the deployment guide for [Render](https://render.com/) or your preferred hosting platform.

### Troubleshooting

- **MongoDB Connection Error:** Ensure MongoDB is running and the `MONGO_URI` in `.env` is correct
- **Port Already in Use:** Change the `PORT` in backend `.env` if port 5000 is unavailable
- **CORS Issues:** Verify `REACT_APP_API_URL` matches your backend URL

If you like this project, please star the repository on GitHub to support future development!
