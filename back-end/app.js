// import and instantiate express
const express = require("express") // CommonJS import style!
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.routes.js');
const financesRouter = require('./routes/finances.routes.js');
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const app = express() // instantiate an Express object

// parse application/json
app.use(bodyParser.json())
app.use(cors())

// parse task data
app.use('/tasks', taskRouter);
//parse finances data
app.use('/finances', financesRouter);

// export the express app we created to make it available to other modules
module.exports = app
