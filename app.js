
//create constants for requiring the modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//create new all instant using Express
const app = express();
//setting our view engine to use as our templating engine
app.set('view engine', 'ejs');
//use body parser to pass our requests
app.use(bodyParser.urlencoded({
  extended: true
}));
//use the public directory to store our srtatic files such as images..
app.use(express.static("public"));
//set up our connection tou our MongoDB
mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});
//created our article scema
const articleSchema = {
  title: String,
  content: String
};
//creat our article model using mongoose
const Article = mongoose.model("Article", articleSchema);
//set up our app to listen on port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
