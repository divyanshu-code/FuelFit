
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





