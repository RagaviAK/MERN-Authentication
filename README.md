# MERN Authentication System

This project is a complete authentication workflow built using the MERN stack. It includes user registration, login, email-based OTP verification, JWT session handling, and password reset functionality. Passwords are securely hashed using bcrypt, and Nodemailer is used to deliver OTPs to users’ inboxes. The backend is structured with modular routes and controllers, and the frontend is built with React for a clean, responsive interface.

---

## Features

### User Registration
- Register using name, email, and password  
- Server-side validation for all inputs  
- Password hashing with bcrypt  
- OTP sent to email for verification  

### Login
- Login using registered email and password  
- Authentication handled using JSON Web Tokens (JWT)  
- Access restricted until user verifies their email  
- Secure token generation and cookie/local storage handling  

### Email OTP Verification
- Sends verification OTP using Nodemailer  
- Verifies user account before enabling login  
- Prevents unverified users from accessing protected routes  

### Password Reset
- Request password reset via email  
- OTP sent to verify identity  
- New password securely hashed using bcrypt  
- Ensures secure reset flow without exposing user data  

### Protected Routes
- Middleware to validate JWT tokens  
- Decodes token to verify user identity  
- Secure access to restricted endpoints  

### Frontend
- Built with React.js  
- React Router for navigation  
- Responsive and clean UI  
- Axios used for API communication  

---

## Tech Stack

### Frontend
- React.js  
- React Router  
- Axios  
- CSS  

### Backend
- Node.js  
- Express.js  
- JSON Web Tokens (JWT)  
- bcrypt for password hashing  
- Nodemailer for sending OTP emails  

### Database
- MongoDB  
- Mongoose  

### Tools
- Git & GitHub  
- Postman  
- VS Code  

---

## API Endpoints 

### Auth Routes
- **POST** `/api/auth/register` – Create new user  
- **POST** `/api/auth/verify` – Verify email using OTP  
- **POST** `/api/auth/login` – Login user and return JWT  
- **POST** `/api/auth/request-reset` – Request password reset OTP  
- **POST** `/api/auth/reset-password` – Reset password  

# Output


## Home page
<img width="1918" height="911" alt="Screenshot 2025-09-13 182040" src="https://github.com/user-attachments/assets/204c391b-33f0-4e76-afaa-18057304201f" />

## Sign Up page
<img width="1915" height="915" alt="Screenshot 2025-09-13 181455" src="https://github.com/user-attachments/assets/7d5df713-bb89-4498-8261-57a613d246c6" />


## Login page
<img width="1919" height="910" alt="Screenshot 2025-09-13 181510" src="https://github.com/user-attachments/assets/66027ff8-b369-4a50-8df9-434e573f3158" />

## Email verification page
<img width="1919" height="908" alt="Screenshot 2025-09-13 182110" src="https://github.com/user-attachments/assets/83b876de-6239-436d-8741-14df0e613f11" />

## Password-reset page
<img width="1919" height="911" alt="Screenshot 2025-09-13 182255" src="https://github.com/user-attachments/assets/395a5c38-86ee-46c1-bb0e-8758868ec7cb" />
<img width="1919" height="906" alt="Screenshot 2025-09-13 182333" src="https://github.com/user-attachments/assets/b1423646-821b-4d01-a29e-8648acf5a5e9" />
<img width="1919" height="911" alt="Screenshot 2025-09-13 182408" src="https://github.com/user-attachments/assets/dbc251d4-72c2-401a-83c4-db7112d13baa" />

