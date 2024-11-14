Live deploy link :- https://bookstore-ojh2zrcab-pintu870s-projects.vercel.app/api/books

````markdown
# CRUD API with Authentication

This is a CRUD (Create, Read, Update, Delete) API with user authentication using JSON Web Tokens (JWT). It allows users to register, login, and perform CRUD operations on books.

## Features

- User registration
- User login with JWT authentication
- Get current user profile
- Create, read, update, and delete books

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js
- dotenv

## Getting Started

### Prerequisites

Make sure you have Node.js and MongoDB installed on your machine.

### Installation

1. Unzip the files:

2. Install dependencies:

   ```bash
   cd Bookstore
   npm install
   ```
````

3. Set environment variables:

   Create a `.env` file in the root directory of your project. Add the following environment variables:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/your_database
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

4. Run the application:

   ```bash
   npm start
   ```

## API Endpoints

### Authentication

#### Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "username": "your_username",
    "token": "your_jwt_token"
  }
  ```

#### Login User

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "user_id",
    "username": "your_username",
    "token": "your_jwt_token"
  }
  ```

### Books

#### Get All Books

- **URL:** `/api/books`
- **Method:** `GET`
- **Authentication:** Required

#### Get Single Book

- **URL:** `/api/books/:id`
- **Method:** `GET`
- **Authentication:** Required

#### Create Book

- **URL:** `/api/books`
- **Method:** `POST`
- **Authentication:** Required
- **Request Body:**

  ```json
  {
    "title": "book_title",
    "author": "book_author",
    "publicationYear": 2022,
    "isbn": "book_isbn"
  }
  ```

#### Update Book

- **URL:** `/api/books/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Request Body:**

  ```json
  {
    "title": "updated_book_title",
    "author": "updated_book_author",
    "publicationYear": 2023,
    "isbn": "updated_book_isbn"
  }
  ```

#### Delete Book

- **URL:** `/api/books/:id`
- **Method:** `DELETE`
- **Authentication:** Required
