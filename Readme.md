# Employee Management System

COMP 3133 - Assignment 1

Student Name: Tawsif Khan Siam
Student ID: 101515575

## Technologies Used

- NodeJS
- Express
- GraphQL (Apollo Server)
- MongoDB
- Mongoose
- JWT Authentication

## Features

- Signup
- Login
- Add Employee
- Get All Employees
- Search by ID
- Search by Designation
- Update Employee
- Delete Employee
- Error Handling
  
## How to Run

1. Clone repo
2. Run `npm install`
3. Create `.env` file
4. Add:
MONGO_URI=yourMongoDBString
 JWT_SECRET=yourSecret
5. Run `npm run dev`

### Sample Login Credentials

Username: john_doe
Password: Password123

## Employee Photo Upload Support

This project supports uploading an employee photo when:

- Creating a new employee
- Updating an existing employee

Uploaded images are stored securely using **Cloudinary**, and the returned image URL is saved in MongoDB.

---

## Environment Variables Required

Create a `.env` file in the project root with the following variables:

## Employee Photo Upload Support

This project supports uploading an employee photo when:

- Creating a new employee
- Updating an existing employee

Uploaded images are stored securely using **Cloudinary**, and the returned image URL is saved in MongoDB.

---

## Environment Variables Required

Create a `.env` file in the project root with the following variables:
MONGO_URI=mongodb://127.0.0.1:27017/comp3133_101515575_Assigment1

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
