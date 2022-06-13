const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//to access environment variables
require("dotenv").config();

//to create express server
const app = express();
const port = process.env.PORT || 5000;

//cors middleware
app.use(cors());
//allows us to parse JSON
app.use(express.json());

//where we store the database in uri
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection establishedd successfully!");
});

//declaring the routes
const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

//in the browser the following path to router files
app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

//starts the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
