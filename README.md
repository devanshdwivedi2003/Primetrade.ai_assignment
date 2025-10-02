FEATURES

✅ User Signup/Login with JWT-based authentication
✅ Password hashing using bcrypt
✅ Protected routes on frontend (React)
✅ Dashboard with user profile & CRUD operations (Posts)
✅ Search & filter functionality
✅ Logout & token invalidation flow
✅ Responsive UI using TailwindCSS
✅ Implement rate limiting & helmet for security


TECH STACK

[Frontend]
React.js
TailwindCSS
Axios for API requests
React Router for protected routes

[Backend]
Node.js + Express
MongoDB with Mongoose ORM
JWT for authentication
Bcrypt for password hashing

frontend/
  ├── src/
  │   ├── components/   # Reusable UI components
  │   ├── pages/        # Login, Signup, Dashboard, etc.
  │   ├── context/        # auth context (e.g., useAuth)
  │   ├── API/         # Helpers (API config)
  │   └── App.js
  ├── public/
  └── package.json


  backend/
  ├── src/
  │   ├── models/       # Mongoose schemas (User, Task)
  │   ├── routes/       # API routes (auth, tasks)
  │   ├── middlewares/  # JWT auth, error handling
  │   ├── config/       # DB connection, env variables
  │   └── server.js
  ├── package.json

  GETTING STARTED
  
 -- git clone (https://github.com/devanshdwivedi2003/Primetrade.ai_assignment.git)
 -- Setup Backend
    cd backend
    npm install
    cp .env.example .env   # Add your DB_URI, JWT_SECRET, PORT
    npm run dev
-- Setup Frontend
  cd frontend
  npm install
  npm run dev


API Endpoints

Auth
POST /auth/signup → Register new user
POST /auth/login → Login + receive JWT token
GET /auth/profile → Fetch user profile (protected)
PUT /auth/profile → UPDATE user profile (protected)

Tasks (CRUD)
POST api/posts/ → Create post
GET api/posts/ → Get All Posts
PUT api/posts/:id → Update Post
DELETE api/posts/:id → Delete Post


SECURITY

Passwords stored with bcrypt hashing
JWT middleware protects routes
CORS enabled for frontend-backend communication
Input validation on both client & server

SCALING NOTES

[Frontend Scaling]
Use Next.js for SSR/ISR → better SEO & performance
Break UI into modular components
Implement state management with Redux Toolkit / Zustand if app grows
Lazy-load heavy components

[Backend Scaling]
Use modular architecture (controllers, services, models, routes)
Use Redis caching for performance
Implement rate limiting & helmet for security

[Database Scaling]
Use indexes for search queries
Horizontal scaling with MongoDB Atlas sharding
Backup strategy & replication for fault tolerance

[Deployment Scaling]
Dockerize both frontend & backend
Use NGINX/Load Balancer for handling traffic
Deploy on AWS/GCP/Azure/Render/Vercel
Use CI/CD pipelines (GitHub Actions)


