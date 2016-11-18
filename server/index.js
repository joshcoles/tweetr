"use strict";

// Basic express setup:

//Access to Mongo
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";
//=======================================================

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const moment        = require('moment');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//access to MongoDB
MongoClient.connect(MONGODB_URI, (err, db) => {
//"Error handling"
    if (err) {
      console.log(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }

//requiring Datahelpers function which handles getting tweets from/saving tweets to DB collection using a node
//this acts as a function, and the 'db' being passed in is the db from Mongo, in which this function resides
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
});

