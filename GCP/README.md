
hw6-tarpaulin-tool-logandom.uc.r.appspot.com 


Tarpaulin - Lightweight Course Management Tool

Tarpaulin is a lightweight course management system developed using Flask and Google Cloud Platform (GCP). The project includes role-based access control and image handling functionality.

Uses Auth0 to authenicate "users" (fake) with a jwt token.

Project Overview

Tarpaulin is designed with the following key features:

Role-based Access Control: Supports three roles - Admin, Instructor, and Student, each with specific permissions.

Image Handling: Uses GCP Cloud Storage to upload and retrieve user avatars.

RESTful APIs: Provides endpoints for managing users, courses, and associated data.

Technologies Used

Flask: Backend framework for the application.

Google Cloud Platform:

Datastore: Stores user and course data.

Cloud Storage: Manages avatar images.

Auth0: Implements JWT-based authentication and authorization.

API Endpoints

User Endpoints

POST /users/login: Authenticate a user and retrieve a JWT.

GET /users: List all users (Admin-only).

GET /users/<user_id>: Retrieve user details.

POST /users/<user_id>/avatar: Upload a user avatar.

GET /users/<user_id>/avatar: Retrieve a user avatar.

DELETE /users/<user_id>/avatar: Delete a user avatar.

Course Endpoints

POST /courses: Create a new course (Admin-only).

GET /courses: List all courses.

GET /courses/<course_id>: Retrieve course details.

PATCH /courses/<course_id>: Update course details (Admin-only).

DELETE /courses/<course_id>: Delete a course (Admin-only).

