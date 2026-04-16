# 🧑‍💼 User Management System (MERN Stack)

A full-stack **User Management System** built using the MERN stack (MongoDB, Express, React, Node.js) with secure authentication, role-based access control (RBAC), and complete user lifecycle management.

This project is developed as part of a technical assessment for demonstrating **full-stack development, authentication security, RBAC implementation, and deployment skills**.

---

## 🚀 Live Demo

- 🌐 Frontend:https://mern-stack-blush-two.vercel.app
  ### 🔑 (Demo Credentials)
  ### Admin Login
   Email: admin@gmail.com  
   Password: admin123
  ### Manager Login  
   Email: rohan@gmail.com  
   Password: rohan123
  ### User Login
   Email: rishi1@gmail.com  
   Password: rishi123
- 🔗 Backend API:https://mern-stack-1-1eby.onrender.com
- 📂 GitHub Repo: https://github.com/your-username/user-management-system  

---

## 🛠️ Tech Stack

### Frontend
- React (Hooks)
- React Router
- Tailwind CSS  

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- bcrypt.js for password hashing

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas

---

## 🔐 Authentication & Authorization

### Authentication
- User login with email and password
- Passwords are securely hashed using **bcrypt**
- JWT-based authentication system
- Protected routes using middleware
- Secure token handling via headers/localStorage

### Authorization (RBAC)
Implemented Role-Based Access Control:

#### 👑 Admin
- Create users
- View all users (with pagination & filters)
- Update any user
- deactivate users
- Assign or change roles

#### 🧑 Manager
- View all users
- Update non-admin users
- Cannot delete users or change admin roles

#### 👤 User
- View own profile
- Update own profile
- Cannot access admin routes or other users

---

## 📦 Features

### 👨‍💼 Admin Features
- Dashboard with user statistics
- Create new users
- Edit user details (name, email, role, status)
- Delete or deactivate users (soft delete supported)
- Pagination and search functionality
- Filter users by role and status
- View audit logs (createdAt, updatedAt, createdBy, updatedBy)

### 👤 User Features
- Secure login/logout
- View personal profile
- Update profile details (name, password)
- Restricted access to admin routes

---

## 🧾 Audit & Activity Tracking
Each user record includes:
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`

Admin can view audit information in user detail view.

---

## 🔒 Security Implementation
- Password hashing using bcrypt
- JWT authentication for session handling
- Protected API routes using middleware
- Input validation on all endpoints
- Prevented sensitive data exposure (password excluded from API responses)
- Environment variables used for all secrets

---

## 🌐 API Endpoints (Sample)

### Auth Routes

POST /api/auth/login


### User Routes (Admin Protected)

GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id


### Profile Routes (User Protected)

GET /api/users/me
PUT /api/users/me


---

## 🧑‍💻 Project Structure

### Backend

backend/
│── models/
│── routes/
│── controllers/
│── middleware/
│── config/
│── server.js


### Frontend

frontend/
│── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── services/
│ └── App.js


---

## ⚙️ Environment Variables

### Backend `.env`

PORT=5000;
MONGO_URI=mongodb://yashkadam:admin%403030@ac-shaxrfj-shard-00-00.oz0zpcj.mongodb.net:27017,ac-shaxrfj-shard-00-01.oz0zpcj.mongodb.net:27017,ac-shaxrfj-shard-00-02.oz0zpcj.mongodb.net:27017/?ssl=true&replicaSet=atlas-cnoo6h-shard-0&authSource=admin&appName=testing ;
JWT_SECRET=your_jwt_secret


### Frontend `.env`

REACT_APP_API_URL=https://mern-stack-1-1eby.onrender.com 


---

## 🚀 Deployment Guide

### Backend Deployment
1. Push code to GitHub
2. Connect repo to Render / Railway
3. Add environment variables
4. Deploy service

### Frontend Deployment
1. Set backend API URL in `.env`
2. Build project:

npm run build

3. Deploy on Vercel 

---

## 🧪 How to Run Locally

### Backend

cd backend ,
npm install ,
npm run dev


### Frontend

cd frontend ,
npm install ,
npm start


---

## 📊 Key Highlights (Assessment Requirements Covered)

✔ Secure JWT Authentication  
✔ Role-Based Access Control (Admin / Manager / User)  
✔ User CRUD operations  
✔ Pagination, filtering, and search  
✔ Password hashing with bcrypt  
✔ Protected backend routes  
✔ Clean architecture (MVC structure)  
✔ Frontend role-based UI rendering  
✔ Environment-based configuration  
✔ Fully deployed frontend & backend  
✔ RESTful API design  
✔ Audit tracking (createdAt, updatedAt, createdBy, updatedBy)  

---

## 📌 Future Improvements
- Refresh token implementation
- Email verification system
- Advanced analytics dashboard
- Activity logs per user
- Two-factor authentication (2FA)

---

## 👨‍💻 Author
**Yash Kadam**
