# Feedback Collection System for Online Classes

This project is a server-side application for managing online courses and collecting feedback. It uses **Prisma** as the ORM for database interactions and provides functionality to create, retrieve, and manage courses.

## hosted url

[Live](https://feedback-collection-for-online-courses.onrender.com)

## Features

- **Course Management**:
  - Create new courses with details such as name, description, duration, and slug.
  - Retrieve a list of all courses.
  - Retrieve details of a specific course by its slug.
- **Default Course Population**:
  - Populate the database with default courses for testing or initial setup.
- project uses mongdb but you can setup any database of your choice
- **Tech Stack**
  - NextJs latest with server actions
  - Prisma ORM
  - JWT to tokens
  - MongoDb but you can use any database suported by Prisma
  - Tailwind Css with ShadCn
  - React-hook-form with zod

## Project Structure

### Key Files and Directories

- **`src/actions/course.ts`**: Contains functions for managing courses, including creating, retrieving, and populating default courses.
- **`src/lib/prisma.ts`**: Configures and initializes the Prisma Client for database interactions.
- **`prisma/schema.prisma`**: Defines the database schema and models.

---

## API Documentation

### 1. **Get All Courses**

Retrieves a list of all courses, ordered by creation date.

**Function**: `getCourses()`

**Response**:

- Success: Returns an array of course objects.
- Error: Throws an error if no courses are found or if the operation fails.

---

### 2. **Get a Specific Course**

Retrieves details of a specific course by its slug.

**Function**: `getCourse(slug: string)`

**Parameters**:

- `slug` (string): The unique identifier for the course.

**Response**:

- Success: Returns the course object.
- Error: Throws an error if the course is not found or if the operation fails.

---

### 3. **Create a New Course**

Creates a new course with the provided details.

**Function**: `createCourse(formData: FormData)`

**Parameters**:

- `formData` (FormData): Contains the following fields:
  - `name` (string): The name of the course (required).
  - `description` (string): A brief description of the course (required).
  - `duration` (string): The duration of the course (required).
  - `slug` (string): A unique identifier for the course (optional, auto-generated if not provided).

**Response**:

- Success: Returns the created course object.
- Error: Throws an error if any required fields are missing or if the operation fails.

---

### 4. **Populate Default Courses**

Populates the database with a predefined set of courses.

**Function**: `defaultCourses()`

**Response**:

- Success: Inserts multiple default courses into the database.
- Error: Throws an error if the operation fails.

---

## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd feedback-collection-for-online-courses
   ```

## Getting Started

First, run the development server:

```bash
npm install
# then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Set Up the Database:

Configure your database connection in the .env file:

```bash
DATABASE_URL=your-database-url
```

Run Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
npx prisma generate
npx prisma db push
```

## Error Handling

- Database Errors: Errors related to database operations are logged to the console and rethrown with user-friendly messages.
- Validation Errors: Missing or invalid input data results in descriptive error messages with react hook form and zod.

## Screenshots

![Screenshot from 2025-04-29 12-01-15](https://github.com/user-attachments/assets/7f44bf0a-41cf-41d8-bfb7-94e04c062450)
![image](https://github.com/user-attachments/assets/84aaafe6-f607-4d61-9b4a-a3a53407f234)
