# Backend File Structure
    .
    ├── src/                # Contains the main application code
    │   ├── controllers/        # Contains controller functions for handling requests
    │   ├── middleware/         # Contains middleware functions for processing requests and responses
    │   ├── models/             # Contains data models for interacting with the database
    │   ├── routes/             # Contains route definitions and handlers
    │   ├── services/           # Responsible for querying the database
    │   ├── json/               # Contains json files
    │   └── app.js              # Main Express.js application file
    ├── test/                   # Contains unit tests for the application
    │   ├── controllers/        # Contains unit tests for controller functions
    │   ├── middleware/         # Contains unit tests for middleware functions
    │   ├── services/           # Responsible for querying the database
    │   ├── routes/             # Contains unit tests for route handlers
    │   └── setup.js            # Setup file for running tests
    ├── node_modules/           # Contains all installed node modules
    ├── package.json            # Contains metadata about the project and its dependencies
    └── README.md               # Contains documentation for the project

# Deploying Instructions

Run `npm install` when in this directory before running any other command.

### `npm start`

Used to initialize the backend with nodemon.

### `npm test`

Used to run the Mocha Unit Tests of the system.

### `npm coverage` 

Used to run the unit tests as well as show code coverage using Istanbul(nyc).