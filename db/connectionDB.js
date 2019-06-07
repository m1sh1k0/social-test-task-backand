var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();
var MongoClient = require ('mongodb').MongoClient;

const uri = process.env.MONGO_URI;



// Or using promises
var client = mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => { console.log("connection DB succesfull") },
    err => { console.log("sorry error DB ${err.message}") }
  );

module.exports = client;