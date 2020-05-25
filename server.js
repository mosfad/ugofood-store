const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();

// Middlewares used
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets(heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
//app.use(routes)

// Connect to the Mongo DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ugofoodstore")

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
