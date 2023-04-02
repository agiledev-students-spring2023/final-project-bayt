// import and instantiate express
const express = require("express") // CommonJS import style!
const bodyParser = require('body-parser');
const financesRouter = require('./routes/finances.routes.js');
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const app = express() // instantiate an Express object

// parse application/json
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//parse finances data
app.use('/finances', financesRouter);

// export the express app we created to make it available to other modules
module.exports = app
