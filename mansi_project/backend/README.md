# Backend Setup and Execution Instructions

## Prerequisites
- Node.js (v14 or higher recommended)
- npm package manager
- MongoDB Atlas account or MongoDB connection string

## Setup Steps

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd mansi_project/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend` directory with the following content:

   ```
   MONGO_URI="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret_key"
   ```

   Example:

   ```
   MONGO_URI="mongodb+srv://vaishnavmili45:WHBZDjAKmGuPrpS0@cluster0.tmwvfr7.mongodb.net/test"
   JWT_SECRET="myverysecuresecretkey"
   ```

4. **Seed the admin user**

   Run the seed script to create the default admin user:

   ```bash
   node seedAdmin.js
   ```

   This will create an admin user with:
   - Email: admin@example.com
   - Password: admin123

5. **Start the backend server**

   ```bash
   npm run dev
   ```

   The server will start and connect to MongoDB. You should see a message:
   ```
   MongoDB Connected
   ```

## Usage

- The backend exposes API endpoints for authentication, agents, contacts, etc.
- Use the admin credentials to login via the frontend or API.
- The JWT token is used for protected routes.

## Troubleshooting

- If you get connection errors, verify your `MONGO_URI` in `.env`.
- If login fails, ensure the admin user is seeded and you use the correct password.
- Check that `JWT_SECRET` is set and consistent.
- Restart the backend server after any `.env` changes.

---

# Frontend Setup and Execution Instructions

## Prerequisites
- Node.js (v14 or higher recommended)
- npm package manager

## Setup Steps

1. **Navigate to frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the frontend development server**

   ```bash
   npm run dev
   ```

4. **Access the frontend**

   Open your browser and go to:

   ```
   http://localhost:5173/
   ```

## Usage

- Use the login form to authenticate.
- Use the seeded admin credentials:
  - Email: admin@example.com
  - Password: admin123

## Troubleshooting

- If login fails, check backend server logs and ensure backend is running.
- Verify the backend API URL in frontend configuration if applicable.
- Clear browser localStorage if you encounter JSON parsing errors.

---

If you encounter any issues, please check logs and environment variable settings carefully.
