# Home Assist

A full-stack service booking platform that allows users to find and request home services such as plumbing, electrical work, cleaning, and other household assistance. Users can register, log in, create service requests, review providers, and manage their profiles.


## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Zod Validation
- REST APIs

### API Testing
- Insomnia


## Features

### Authentication
- User Registration
- User Login
- JWT Token Generation
- Protected Routes

### Users
- View All Users
- View User By ID
- Update User Details
- Delete User

### Service Types
- Create Service Type
- View All Service Types

Examples:
- Plumber
- Electrician
- Carpenter
- Cleaner

### Providers
- Create Provider
- View All Providers
- View Provider By ID
- Update Provider
- Delete Provider
- Pagination Support

### Service Requests
- Create Service Request
- View All Requests
- Update Request Status

### Reviews
- Create Review
- View All Reviews
- Delete Review
- Pagination Support

### Validation
- Zod Request Validation
- Custom Error Messages

### Security
- JWT Authentication Middleware
- Protected APIs


## Project Structure

```text
HomeAssist/
│
├── config/
│   └── dbconnection.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── provider.controller.js
│   ├── serviceType.controller.js
│   ├── serviceRequest.controller.js
│   └── review.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
│
├── migrations/
│
├── models/
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── provider.routes.js
│   ├── serviceType.routes.js
│   ├── serviceRequest.routes.js
│   ├── review.routes.js
│   └── index.js
│
├── seeders/
│
├── utils/
│   └── pagination.js
│
├── validations/
│   ├── auth.validation.js
│   ├── provider.validation.js
│   ├── review.validation.js
│   └── serviceRequest.validation.js
│
├── .env
├── app.js
├── package.json
└── README.md
```


## Database Tables

### Users

```text
id
name
email
password
phone
role
created_at
updated_at
```

### Service Types

```text
id
service_name
created_at
updated_at
```

### Providers

```text
id
name
email
phone
experience_years
city
address
service_type_id
created_at
updated_at
```

### Service Requests

```text
id
user_id
provider_id
description
status
created_at
updated_at
```

### Reviews

```text
id
user_id
provider_id
rating
comment
created_at
updated_at
```


## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd HomeAssist
```



### 2️⃣ Install Dependencies

```bash
npm install
```


### 3️⃣ Create .env File

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=homeassist_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
```


### 4️⃣ Create Database

```sql
CREATE DATABASE homeassist_db;
```


### 5️⃣ Run Migrations

```bash
npx sequelize-cli db:migrate
```


### 6️⃣ Run Seeders

```bash
npx sequelize-cli db:seed:all
```


### 7️⃣ Start Server

```bash
npm start
```

or

```bash
nodemon app.js
```


## Server

```text
http://localhost:3000
```


## Authentication APIs

### Register User

```http
POST /api/auth/signup
```

Request:

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456",
  "phone": "9876543210",
  "role": "customer"
}
```


### Login User

```http
POST /api/auth/signin
```

Request:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```



## Protected Routes

Pass JWT Token in Header:

```http
Authorization: Bearer jwt_token_here
```


## Pagination

Supported APIs:

```http
GET /api/users?page=1&limit=5

GET /api/providers?page=1&limit=5

GET /api/reviews?page=1&limit=5

GET /api/service-requests?page=1&limit=5
```

Example:

```http
GET /api/providers?page=2&limit=3
```


## Validation

Zod is used for request validation.

Example Error:

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```


## Testing APIs

Use:

- Insomnia


Test Flow:

```text
1. Signup
2. Signin
3. Copy JWT Token
4. Add Authorization Header
5. Access Protected Routes
6. Create Providers
7. Create Service Requests
8. Add Reviews
9. Test Pagination
```


## Future Enhancements

- Role Based Access Control (Admin/User)
- Service Search & Filters
- File Uploads
- Provider Availability Management
- Booking History
- Email Notifications
- Dashboard Analytics
- Frontend Integration (React)


## Author

Home Assist Project
Node.js + Express.js + PostgreSQL + Sequelize