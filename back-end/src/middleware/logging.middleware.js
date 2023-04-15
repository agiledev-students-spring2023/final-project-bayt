app = require("../app");

/* Error handler middleware from https://github.com/geshan/expressjs-structure/blob/master/index.js */ 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    next();
});
