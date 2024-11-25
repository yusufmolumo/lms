# Student-Centered Learning Management Platform (SCLMP)

**SCLMP** is a comprehensive web-based Learning Management Platform aimed at creating an interactive and collaborative space for students, teachers, and administrators. This platform offers functionalities to manage assignments, grades, course materials, and role-based dashboards for different types of users. It is designed to be intuitive and easy to use for anyone involved in the learning process, from students accessing course materials to admins managing the platform.

---

## Features

- **Role-Based Access**: Separate dashboards for students, teachers, and administrators.
- **Secure Authentication**: User registration, login, and JWT-based authentication.
- **Course Management**: Teachers can create, manage, and grade assignments, while students can submit assignments and track their progress.
- **Admin Dashboard**: Admins can manage users, view platform data, and monitor system activity.
- **Responsive Design**: Built with a mobile-first approach using **TailwindCSS** for responsive UI design.

---

## Tech Stack

- **Frontend**: HTML, CSS (TailwindCSS), JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Version Control**: Git, GitHub

---

## Project Setup and Installation

Follow the instructions below to set up the **SCLMP** project on your local machine.

### Prerequisites

Before starting, make sure you have the following software installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community) or set up a MongoDB Atlas account.
- **Git**: [Download Git](https://git-scm.com/)

### Step 1: Clone the Repository

Start by cloning the project repository to your local machine.

```bash
git clone https://github.com/your-username/SCLMP.git
cd SCLMP

Step 2: Install Backend Dependencies
1. Navigate to the backend folder (if not already in it):
cd backend

2. Install required dependencies using npm:
npm install

Step 3: Set Up Environment Variables
1. In the root directory of the project, create a .env file to store environment variables. The .env file should contain:
MONGO_URI=mongodb://localhost:27017/sclmp
PORT=5000
MONGO_URI: MongoDB connection string (replace with your MongoDB URI, local or cloud-based via MongoDB Atlas).
PORT: The port number where the backend server will run (default is 5000)

Step 4: Start the Backend Server
Run the backend server by executing:
npm start
The backend should now be running at http://localhost:5000

Step 5: Install Frontend Dependencies
1. Navigate to the frontend directory:
cd ../frontend
2. Although the frontend is static (HTML, CSS, JS), it’s a good idea to use a local server to run the application during development. You can install Live Server in VS Code or use a simple HTTP server to serve your files. If you're using Live Server in VS Code:

Right-click index.html (or any HTML file).
Select "Open with Live Server".
The frontend should now be accessible at http://localhost:5500 or whichever port is provided by your server.

Usage
Sign Up: Users can sign up by providing their name, email, password, and role (Student or Teacher). Admin users will be able to create or manage other users.
Login: After signing up, users can log in using their credentials, which will be authenticated using JWT.
Dashboards:
Admin Dashboard: Admins can manage users and oversee platform activity.
Teacher Dashboard: Teachers can manage courses, assignments, grades, and track student progress.
Student Dashboard: Students can access learning materials, submit assignments, and track their progress.

Contributing
We welcome contributions to SCLMP! To contribute, follow these steps:
1. Fork the repository to your own GitHub account.
2. Create a new branch for your changes:
git checkout -b feature/your-feature
3. Make your changes and commit them:
git commit -am 'Add new feature'
4. Push your branch to your repository
git push origin master
5. Open a pull request to the main repository with a description of your changes.

License
This project is licensed under the MIT License

