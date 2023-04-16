// import and instantiate express
const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

// import and instantiate mongoose
const mongoose = require("mongoose")
require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env

// // connect to database
if (process.env.NODE_ENV === 'test') {
    mongoose
        .connect(`${process.env.DB_CONNECTION_STRING}`)
        .then(data => console.log(`Connected to MongoDB`))
        .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))
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

const app = express() // instantiate an Express object

// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

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
