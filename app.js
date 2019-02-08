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

app.route("/articles")
  //create our get route that fetches all of the articles
  .get(function(req, res) {
    //query the db and find all the articles
    Article.find(function(err, foundArticles) {
      //if condition for errors
      if (!err) {
        //send the articles back to the client
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  //create our post route that fetches all of the articles
  .post(function(req, res) {
    //grab some data that was sent through with req.body.title and req.body.content and
    //create a new constant to store a new article
    const newArticle = new Article({
      //define the data for the two fields
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.")
      } else {
        res.send(err);
      }
    });
  })
  //create our delete route that fetches all of the articles
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfully deleted all articles.")
      } else {
        res.send(err);
      }
    });
  });

//set up our app to listen on port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
