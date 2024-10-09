require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { apiError } = require("./utils/apiError");
const router = require("./routes/router");
const corsOption = require("./utils/corsOption");

const app = express();

//middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//log - morgan
const env = process.env.ENV;
if (env === "dev") {
  app.use(morgan(env));
}

//router
app.use(router);

//not found
app.all("*", (req, res, next) => {
  const err = new Error(`Path ${req.originalUrl} not founded in server`);
  err.statusCode = 404;
  next(err);
});

//Error API
app.use(apiError);

//run server
app.listen(port, () => console.log("server run on port : " + port));
