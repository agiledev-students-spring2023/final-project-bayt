// import and instantiate express
const express = require("express") // CommonJS import style!
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.routes.js');
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const fs = require('fs');
const profRouter = require('./routes/prof.routes.js');

const app = express() // instantiate an Express object

// parse application/json
app.use(bodyParser.json())
app.use(cors())
// parse task data
app.use('/tasks', taskRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/Profile', profRouter);

module.exports = app