require('dotenv').config({ silent: true }); // load environmental variables from a hidden file named .env
// import and instantiate express
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
require("dotenv").config({ silent: true });

// The following are used for authentication with JSON Web Tokens
const passport = require("passport");

// Import JWT 
const jwtConfig = require("./configs/jwt.config.js");
passport.use(jwtConfig.jwtStrategy);

const app = express(); // instantiate an Express object

// use passport middleware
app.use(passport.initialize());
app.use(jwtConfig.protectContentMiddleware);

// import and instantiate mongoose
const mongoose = require("mongoose");

// connect to database
if (process.env.NODE_ENV === "production") {
    console.log("Production mode activated.");
    mongoose
        .connect(`${process.env.DB_CONNECTION_STRING}`)
        .then(data => console.log(`Connected to MongoDB`))
        .catch(err => console.error(`Failed to connect to MongoDB: ${err}`));
} else {
    console.log("Testing mode activated.");
}

const taskRouter = require('./routes/task.route.js');
const profRouter = require('./routes/prof.route.js');
const financesRouter = require('./routes/finances.route.js');
const settingsRouter = require('./routes/settings.route.js');
const loginRouter = require('./routes/login.route.js');
const addMembersRouter = require('./routes/addmembers.route.js');
const homeRouter = require('./routes/home.route.js');
const alertsRouter = require('./routes/alerts.route.js');
const signupRouter = require('./routes/signup.route.js');
const protectedContentRouter = require("./routes/protectcontent.route.js");


// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// protect content
app.use(`/protected`, protectedContentRouter);
// parse profile data
app.use('/Profile', profRouter);
// parse task data
app.use('/tasks', taskRouter);
//parse finances data
app.use('/finances', financesRouter);
//parse alerts data
app.use('/alerts', alertsRouter);
//parse settings data
app.use('/settings', settingsRouter);
// parse login data
app.use('/login', loginRouter);
//parse addMembers data
app.use('/addMembers', addMembersRouter);
// parse home data
app.use('/home', homeRouter);
// parse signup data
app.use(`/signup`, signupRouter);

// export the express app we created to make it available to other modules
module.exports = app
