# user-acc-mgt
User Account Management

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
- The APIs were tested and documented with Postman, and they are available https://documenter.getpostman.com/view/4171874/2s93kz7RXf

### Running the scaled version of the application
- This application has been scaled using the node:cluster module, where worker processes are forked based on the number of cpus available from the main process
- Run the scale version using the cmd `node src/cluster.js`
- You can run a load test using the cmd `npx loadtest http://localhost:5000/` before and after scaling the application to see how the application handled an increased amount of requests after scaling 
