# Library API

The Library API is a project designed for managing a library system. It allows users to borrow and return books, as well as retrieve information about users and books.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used to build the server-side application.
- **Express.js**: A web application framework for Node.js, simplifying the process of building web servers and APIs.
- **Prisma ORM**: An Object-Relational Mapping (ORM) tool providing an abstraction layer for interacting with the database using JavaScript.
- **SQLite**: A lightweight, disk-based database used for managing and storing data in this project.

## API Endpoints

### 1. Users

#### Get Users

- **Method:** `GET`
- **URL:** `http://localhost:3000/users`
- **Description:** Retrieves a list of all users.

#### Get User

- **Method:** `GET`
- **URL:** `http://localhost:3000/users/:id`
- **Description:** Retrieves information for a specific user by ID.

#### Create User

- **Method:** `POST`
- **URL:** `http://localhost:3000/users`
- **Description:** Creates a new user.
- **Body:**
  
  ```json
  {
    "name": "User Name"
  }
  ```

### 2. Books

#### Get Books

- **Method:** `GET`
- **URL:** `http://localhost:3000/books`
- **Description:** Retrieves a list of all books.

#### Get Book

- **Method:** `GET`
- **URL:** `http://localhost:3000/books/:id`
- **Description:** Retrieves information for a specific book by ID.

#### Create Book

- **Method:** `POST`
- **URL:** `http://localhost:3000/books`
- **Description:** Creates a new book.
- **Body:**
  
  ```json
  {
    "name": "Book Name"
  }
  ```

### 3. Borrowing

#### Borrow Book

- **Method:** `POST`
- **URL:** `http://localhost:3000/users/:userId/borrow/:bookId`
- **Description:** Allows a user to borrow a book.

### 4. Returning

#### Return Book

- **Method:** `POST`
- **URL:** `http://localhost:3000/users/:userId/return/:bookId`
- **Description:** Allows a user to return a borrowed book and optionally provide a score.
- **Body:**
  
  ```json
  {
    "score": 9
  }
  ```
