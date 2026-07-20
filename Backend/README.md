# FuelFit Backend

This document lists the main API route endpoints defined in the backend routes (as implemented in `Routes/UserRoute.js`). For each endpoint below you'll find the HTTP method, the route path (relative to where the router is mounted), expected request body and auth requirements.


## User Routes

- **POST /register** : Register a new user
	- Body (JSON):
		- `name` (string) - optional but recommended
		- `email` (string) - required, must be a valid email
		- `password` (string) - required, minimum length enforced in controller
	- Response (201): `{ success: true, token: <jwt> }`
	- Errors: 400 for validation (invalid email/password or email already in use), 500 for server errors.

- **POST /login** : Login existing user
	- Body (JSON):
		- `email` (string) - required
		- `password` (string) - required
	- Response (200):
		- `{ success: true, user: { _id, hasFitnessDetails }, token: <jwt> }`
	- Errors: 400 if user doesn't exist or password incorrect, 500 for server errors.

- **POST /details** : Submit or update fitness details (protected)
	- Middleware: `verifyToken` (user must be authenticated)
	- Body (JSON):
		- `userId` (string) - required (id of the user to update)
		- `age` (number) - required, must be > 0
		- `height` (number) - required, must be > 0
		- `weight` (number) - required, must be > 0
		- `fitnessGoal` (string) - optional (e.g., "lose weight", "build muscle")
		- `gender` (string) - optional
		- `mealtype` (string) - optional
	- Response (200): `{ success: true, user: <updatedUser> }` (updated user document)
	- Errors: 400 for missing/invalid fields, 404 if user not found, 500 for server errors.

Example `Authorization` header for protected requests:

```
Authorization: Bearer <token>
```
**Notes:**
- The routes listed below are taken from `Routes/UserRoute.js` and the related controller logic in `Controllers/UserController.js`.
- The router may be mounted under a base path in `index.js` (for example: `/api/user`). If mounted, prepend that base path to the relative routes below.
- Protected routes require an Authorization header: `Authorization: Bearer <token>` where `<token>` is the JWT returned after login or register.

## Profile Routes

- **GET /userdata/:id** : Get user profile data (protected)
	- Params: `id` (string) - user id in URL path
	- Headers: `Authorization: Bearer <token>`
	- Response (200): `{ success: true, user }`
	- Errors: 404 if user not found, 500 for server errors.

- **POST /upload/:userId** : Upload profile image (protected)
	- Params: `userId` (string) - user id in URL path
	- Headers: `Authorization: Bearer <token>`
	- Content-Type: `multipart/form-data` with file field `profileImage`
	- Response (200): `{ success: true, imageUrl: "/uploads/<filename>" }`
	- Errors: 400 if no file, 404 if user not found, 500 for server errors.

- **PUT /profileupdate/:userId** : Update profile information
	- Params: `userId` (string) - user id in URL path
	- Body (JSON): fields to update (any user fields supported by the model)
	- Response (200): `{ success: true, message: "Profile updated", user: <updatedUser> }`
	- Errors: 404 if user not found, 500 for server errors.

**Notes:**
- Uploaded images are stored in the `uploads/` directory and served from `/uploads/<filename>` path.
- `upload` middleware uses multer with storage destination `uploads` and filename pattern `Date.now()-originalname`.

## Dashboard Routes

- **GET /data/:userId** : Get dashboard data for a user (protected)
	- Params: `userId` (string) - user id in URL path
	- Headers: `Authorization: Bearer <token>`
	- Response (200):
		- `{ user, todayData, yesterdayData, progressHistory, streak, maxi }`
			- `todayData` / `yesterdayData`: meal tracking documents for the day
			- `progressHistory`: array of { date, completed } entries
			- `streak`: current completion streak
			- `maxi`: maximum streak
	- Errors: 404 if user not found, 500 for server errors.

- **POST /update/:userId** : Mark a meal as completed and update totals (protected)
	- Params: `userId` (string) - user id in URL path
	- Headers: `Authorization: Bearer <token>`
	- Body (JSON):
		- `mealId` (string) - id of the meal within today's `meals` subdocument
		- `nutrition` (object) - nutrition numbers to add, e.g. `{ protein, carbs, fat, calories, water }`
	- Response (200): `{ message: "Meal completed", track }` where `track` is the updated meal tracking document
	- Errors: 404 if no meals for today or meal not found, 500 for server errors.

- **GET /exercise/:goal** : Get exercise suggestions for a goal (public)
	- Params: `goal` (string) - e.g., `Stay Fit`, `Muscle Gain`, `Fat Loss`, `Weight Gain`
	- Response (200): `{ exercises: [...] }` (array of exercise objects)
	- Notes: Returns a curated list of exercises (no auth required).

**Notes:**
- The dashboard may fetch meal recipes from Edamam using `EDAMAM_APP_ID` and `EDAMAM_APP_KEY` environment variables. If the Edamam fetch fails, the route returns a 500 error.
- Protected dashboard routes use the same `verifyToken` middleware and expect a JWT token in the `Authorization` header.

## Feedback Routes

- **POST /submit** : Submit user feedback to admin email (public)
	- Body (JSON):
		- `name` (string) - required
		- `email` (string) - required, sender's email
		- `thoughts` (string) - required, the feedback message
		- `rating` (number) - required, out of 5
	- Response (200): `{ success: true, message: "Feedback sent successfully." }`
	- Errors: 400 for missing fields, 500 if Nodemailer fails or `.env` variables are missing.

**Notes:**
- This route requires `EMAIL_USER` and `EMAIL_PASS` (Gmail App Password) configured in the backend `.env` file to correctly authenticate with SMTP.
- Feedback emails will set the `replyTo` address to the user's provided email.

## Chat Routes (RAG Assistant)

- **POST /ask** : Ask a question to the FuelFit AI Assistant (public)
	- Route Base: `/api/chat/ask`
	- Body (JSON):
		- `question` (string) - required, the user's typed question
	- Response (200): `{ success: true, answer: <string> }`
	- Errors: 400 if question is missing, 500 for server/AI service errors.

**Notes:**
- This endpoint implements a Retrieval-Augmented Generation (RAG) pipeline.
- **Embeddings:** Uses Google Gemini (`gemini-embedding-001`) to embed the user query.
- **Vector Search:** Queries a Pinecone vector database (`fuelfit` index, 768 dimensions) to fetch relevant chunks of the FuelFit Brand Document.
- **LLM:** Injects the retrieved context into a prompt and calls the Groq `llama-3.3-70b-versatile` model to generate the final response.
- Requires `.env` variables: `VITE_PINECONE_API_KEY`, `VITE_GOOGLE_API_KEY`, and `VITE_GROQ_API_KEY`.

---

## Setup & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of the `Backend` directory. You will need the following keys configured:
   ```env
   # Server & Database
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   # Nodemailer (Feedback Route)
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password

   # RAG Chatbot (AI & Vector DB)
   VITE_PINECONE_API_KEY=your_pinecone_api_key
   VITE_GOOGLE_API_KEY=your_google_gemini_api_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

3. **Seeding the Pinecone Knowledge Base (Optional):**
   If you need to re-seed the RAG system, ensure your PDF is placed in the backend directory and run:
   ```bash
   node scripts/seedPinecone.js
   ```

4. **Run the Server:**
   ```bash
   node index.js
   # or use nodemon for auto-restarts on code changes
   ```
   The server will run at `http://localhost:4000`.
