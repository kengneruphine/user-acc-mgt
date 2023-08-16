# user-acc-mgt
User account management

This repository contains the backend implementation of the user account management for a web application.

It contains the endpoints which can allow the following operations

- Registration
- Email Verification (Multi-factor authentication)
- Login
- Reset Password
- Upload verification documents.
- Verify user account
- Change status of the user account


### How to Run the project
1. Clone the repo
2. Cd into the root directory and run `npm install` to install all dependencies
3. Run `npm run dev` to start the project
4. The project will be running on `localhost:5000`
5. The base URL for the endpoints is `localhost:5000/api`
6. Test implemented using Jest. Run `npm run test` to run test


### How to run the project in the docker container
1. Make sure you have docker installed on your computer
2. Clone the repo
3. Cd into the root directory and run `docker-compose up` to start the containers
4. You can access the project at `localhost:5000/api`
5. Use `docker-compose down` to stop the containers


### API documentation 
- The APIs were tested and documented with Postman and they are available https://documenter.getpostman.com/view/4171874/2s93kz7RXf