const express = require("express");
const app = express();
require('dotenv').config(); // For .env credentials

const {
  httpCodes,
  messages
} = require("./config/constants");

// Main Route

// Static route to show default message
app.get('/', function(req, res) {
    res.send('Nodejs demo backend');
});

// Backend API with long polling
app.get('/api', function(req, res) {
  req.setTimeout(0);
  setTimeout(() => {
    console.log("PORT:"+req.query.port, "Long Polling:"+req.query.loanpolling);
    return res.send('Completed backend operation for PORT:'+req.query.port);
  }, req.query.loanpolling);
});

// Backend Server is starts from here
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

// Http request & Header 
app.all("/*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers,authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  return res.status(httpCodes.notFound).json({
    message: messages.urlNotFound
  });
});

app.use((error, req, res, next) => {
  if (error) {
    return res.status(httpCodes.internalError).json({
      error: messages.internalError
    });
  }
  next();
});