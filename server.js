const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
//require("dotenv").config();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const app = express();
const db = require("./config/keys").mongoURI;

// Middlewares used
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets(heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// API routes
app.use(routes);

// View routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Connect to the Mongo DB
mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false });

const dbMongo = mongoose.connection;
dbMongo.on("error", console.error.bind(console, "connection error: "));
dbMongo.once("open", function () {
  console.log("We are connected to the database!");
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
