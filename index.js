require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const corsOptions = require("./config/cors");
const credentials = require("./middleware/credentials");
const errorHandlerMiddleware = require("./middleware/error_handler");

const PORT = process.env.PORT || 3000;
const app = express();

//Allow Credentials
app.use(credentials);

//CORS
app.use(cors(corsOptions));

//application.x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//application/json response
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//static files
app.use("/static", express.static(path.join(__dirname, "public")));

//Default error handler
app.use(errorHandlerMiddleware);

//Routes
app.use("/", require("./routes/api/users"));
app.use("/", require("./routes/api/books"));
app.use("/", require("./routes/api/borrows"));

app.listen(PORT, () => {
  console.log(`Server working: http://localhost:${PORT}`);
});
