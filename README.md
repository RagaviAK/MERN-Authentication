# MERN Authentication & Security Management System

A full-stack authentication and security management system built using the MERN stack. The application implements secure user authentication, email verification, password recovery, multi-device session management, role-based access control (RBAC), an admin dashboard, and audit logging. It follows modern security practices by using HTTP-only cookies, JWT authentication, bcrypt password hashing, and server-side authorization.

---

# Features

## Authentication

### User Registration

* Register using name, email, and password
* Server-side input validation
* Password hashing using bcrypt
* Automatic welcome email after successful registration
* Secure JWT generation using HTTP-only cookies

### User Login

* Login with registered email and password
* Password verification using bcrypt
* JWT authentication
* HTTP-only cookie-based authentication
* Browser and device detection using `ua-parser-js`
* Automatic session creation on every login

### Logout

* Secure logout
* Session removal from database
* HTTP-only cookie cleared

---

## Email Verification

* Generate secure 6-digit OTP
* Send OTP via Nodemailer
* OTP expiration support
* Verify email before granting full account access

---

## Password Reset

* Request password reset OTP
* OTP verification
* Secure password update
* Password hashing using bcrypt
* OTP expiration handling

---

## Multi-Device Session Management

Every successful login creates a separate session.

Each session stores:

* Device Name
* Browser Name
* Login Time
* Last Active Time
* Session Expiration

Users can:

* View all active sessions
* Logout the current device
* Logout any specific device
* Logout all other active devices

---

## Role-Based Access Control (RBAC)

Supports multiple user roles.

Current roles:

* User
* Admin

Features:

* Protected admin routes
* Role-based authorization middleware
* Dynamic role updates
* Admin-only APIs

---

## Admin Dashboard

Provides administrators with an overview of the system.

Dashboard Statistics:

* Total Users
* Verified Users
* Unverified Users
* Active Sessions

---

## User Management

Administrators can:

* View all registered users
* View verification status
* View assigned roles
* Change user roles

---

## Audit Logging

Tracks important security-related events throughout the application.

Logged events include:

* User Registration
* Login
* Logout
* Email Verification
* Password Reset
* Role Changes
* Device Logout
* Logout All Devices

Each audit log records:

* User performing the action
* Target user
* Action type
* Description
* IP Address
* User Agent
* Timestamp

---

## Protected Routes

JWT authentication middleware validates every protected request by:

* Verifying JWT
* Validating active session
* Checking session expiration
* Updating last active timestamp

Unauthorized users are denied access automatically.

---

# Tech Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* JSON Web Token (JWT)
* bcrypt
* Nodemailer
* ua-parser-js

## Database

* MongoDB


# Output


## Home page
<img width="1917" height="966" alt="Screenshot 2026-07-04 111535" src="https://github.com/user-attachments/assets/bab9057b-f3c9-4508-b904-15e604f4a545" />

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

## Security page

<img width="1913" height="970" alt="Screenshot 2026-07-04 111240" src="https://github.com/user-attachments/assets/0deee740-ccbb-4407-b097-29536dd3565e" />

## Audit log page
<img width="1917" height="961" alt="Screenshot 2026-07-04 111350" src="https://github.com/user-attachments/assets/79fd0778-106b-44b5-ac9e-c3c2c0749108" />

## Admin dashboard
<img width="1917" height="971" alt="Screenshot 2026-07-04 111309" src="https://github.com/user-attachments/assets/e44594ee-7230-4593-a386-8cdef5aab555" />




