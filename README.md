## FuelFit – Your Personal Fitness Guide

**FuelFit** is a full-stack fitness tracking application designed to help you stay consistent on your health journey. It allows users to set their fitness goals, monitor daily nutrition, track progress, and receive personalized meal suggestions based on their preferences.

## Inspiration Behind FuelFit

The idea for FuelFit came from observing a common struggle in the gym — especially among beginners. After a workout, many new members would often ask: 

**“What should I eat now?”**
**“Is this food good for my body?”**

With so many food options available in the market, beginners easily get confused about what to eat, when to eat, and how much to eat. Seeing this confusion regularly, the thought was:

**Why not build something that gives personalized meal suggestions based on fitness goals?**

That's how **FuelFit** was born — a platform that automatically provides daily meal recommendations and tracks progress based on individual goals and preferences. FuelFit helps users know exactly what to eat and when to eat so they can stay consistent and focused on their fitness journey.

## Key Features

FuelFit provides the following features:
- **Goal-based fitness tracking**: Set your fitness goals and let FuelFit guide your daily journey.
- **Nutrition monitoring**: Track your daily meals, calories, and macros with ease using the Edamam API.
- **Personalized meal suggestions**: Receive smart, customizable meal recommendations based on your dietary preferences.
- **Daily progress insight**: Visual representation through an interactive calendar to help you stay on track and improve consistency.
- **Interactive AI Assistant (RAG)**: A smart, context-aware FAQ chatbot powered by Pinecone, Google Gemini (embeddings), and Groq (LLM).
- **Admin Feedback System**: Direct email feedback functionality powered by Nodemailer.
- **Secure authentication**: Fully protected user data using JWT-based auth.
- **Premium UI/UX**: Glassmorphism aesthetic, smooth Framer Motion springs, and GSAP scroll animations.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Context API 
- Framer Motion & GSAP
- Axios & React Router DOM

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Nodemailer (for Admin Feedback)
- Cloudinary (for Profile Picture uploads)

### AI & Data
- Pinecone (Vector Database)
- Google Gemini (`gemini-embedding-001`)
- Groq (`llama-3.3-70b-versatile`)
- pdf2json (for knowledge base chunking)

## Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas)
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FuelFit.git
   cd FuelFit
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```
   
   Create a `.env` file in the `Backend` directory:
   ```env
   # Server & Database
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   
   # Cloudinary (Profile Pictures)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Nodemailer (Feedback)
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   
   # RAG Chatbot (AI & Vector DB)
   VITE_PINECONE_API_KEY=your_pinecone_api_key
   VITE_GOOGLE_API_KEY=your_google_gemini_api_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```
   
   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_EDAMAM_APP_ID=your_edamam_app_id
   VITE_EDAMAM_APP_KEY=your_edamam_app_key
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   node index.js
   # Or use nodemon if installed: nodemon index.js
   ```
   The backend will start on `http://localhost:4000`

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd Frontend
   npm run dev
   ```
   The app will open at `http://localhost:5173`

## Project Structure

For detailed documentation on the API endpoints and Frontend architecture, please refer to the dedicated README files in their respective folders:
- [Backend Documentation](./Backend/README.md)
- [Frontend Documentation](./Frontend/README.md)

## Troubleshooting

- **MongoDB Connection Error:** Ensure MongoDB is running and the `MONGO_URI` is correctly formatted in your backend `.env`.
- **CORS Issues:** The backend uses standard CORS middleware. Ensure your frontend is running on the expected local port or update the CORS configuration in `Backend/index.js`.
- **Emails Not Sending:** Verify that `EMAIL_USER` and `EMAIL_PASS` (16-character App Password) are set in the backend `.env`.

If you like this project, please star the repository on GitHub to support future development!
