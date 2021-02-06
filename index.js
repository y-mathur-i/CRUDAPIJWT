const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
// importing env
require("dotenv").config();

// home route
app.get("/", (_, res) => {
  res.send("Crud Api- using jsonwebtoken");
});

// connecting to database
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to databse");
  }
);

// json middleware
app.use(bodyParser.json());

// bringing in suth route
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/post");
// adding middleware
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
// setting port variable
const PORT = 5000 || process.env.PORT;

// listen on port
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
