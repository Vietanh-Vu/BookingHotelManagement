# Booking Hotel Management System

## Project Overview

The Booking Hotel Management System is a comprehensive software solution designed to manage hotels of various types. It enables efficient management of hotel facilities, rooms, and user statistics. With a user-friendly interface, administrators can easily manipulate and monitor the system.

## Table of Contents

- [Booking Hotel Management System](#booking-hotel-management-system)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
    - [Code Folder: Source Code](#code-folder-source-code)
    - [Resources Folder: Project Resources](#resources-folder-project-resources)
  - [Usage](#usage)
  - [Technologies Used](#technologies-used)

## Project Structure

The project consists of two main folders: `code` and `resources`.

### Code Folder: Source Code

The `code` folder contains the source code of the project.

- **api**: This folder contains the code responsible for connecting to the database and providing APIs for the frontend. The folder follows the MVC (Model-View-Controller) structure.
- **web**: This folder contains the frontend logic and is organized based on the React file structure.
- **database**: This folder includes the SQL queries required to build the project's database.

### Resources Folder: Project Resources

The `resources` folder contains additional resources related to the project.

- **Slide**: This folder contains presentation slides used during the course.
- **ER.img**: This image represents the database structure based on the Entity-Relationship (ER) diagram.
- **database.pdf**: This document provides an explanation of the database design.

## Usage

Follow the steps below to use the Booking Hotel Management System:

1. Clone the repository:

   ```command
   git clone https://github.com/Vietanh-Vu/BookingHotelManagement.git
   ```

2. Build the database:

- Start the SQL server and build the database using the data (data, trigger and function) provided in the `database` folder.
- Update the database connection configuration in the `connectDB.js` file.

  ```javascript
  const config = {
    server: "Your server name",
    database: "BookingHotel",
    driver: "msnodesqlv8",
    user: "sa",
    password: "Your password",
    options: {
      trustedConnection: true,
    },
  };
  ```

  > **NOTE:** If you are using Windows Authentication, you can remove the `user` and `password` fields.

1. Configure Environment

- In the `api` folder, create a `.env` file with the following contents:

  ```plaintext
  JWT_ACCESS_KEY=yourSecretKey
  JWT_REFRESH_KEY=yourSecretKey
  ```

- In the `web` folder, create a `.env` file with the following contents:

  ```plaintext
  APP_NAME=my-app
  DEV_SERVER_PORT=8080
  ```

4. Run the web app

   After building the database and configuring the environment, you can run the web app.

   - Navigate to the `api` folder and run the following command:

     ```
     npm start
     ```

   - Then navigate to the `web` folder and run the following command:

     ```
     npm run start
     ```

   - Open the browser then connect to the link [http://localhost:8080/admin/login](http://localhost:8080/admin/login) to start using the web app.

## Technologies Used

The Booking Hotel Management System utilizes the following technologies:

- **Frontend**: ReactJS with the Material-UI library for building UI and intuitive user interfaces.
- **Backend**: Node.js, a JavaScript runtime environment, along with Express.js, a flexible web application framework, for handling server-side logic and API endpoints.
- **Database**: SQL Server, a relational database management system, for storing and retrieving data efficiently.

These technologies have been chosen for their robustness, scalability, and extensive community support, ensuring a reliable and efficient hotel management system.
