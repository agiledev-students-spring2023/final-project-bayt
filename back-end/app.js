// import and instantiate express
const express = require("express") // CommonJS import style!
const bodyParser = require('body-parser');
const taskRouter = require('./src/routes/task.routes.js');
const app = express() // instantiate an Express object

// parse application/json
app.use(bodyParser.json())

// parse task data
app.use('/tasks', taskRouter);

// export the express app we created to make it available to other modules
module.exports = app
