var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).catch(error => console.log("Something went wrong: " + error));

var recipes_db = require("./databases/recipes");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public")); 

// Take user to index home page with "/" or "/index"
app.get("/", function(req, res){
    res.render("pages/index");
});
app.get("/index", function(req, res){
    res.render("pages/index");
});

app.get("/form", function(req, res){
    res.render("pages/form");
});

app.get("/all_recipes", function(req,res) {
    recipes_db.listAllRecipes().then(function(recipes){
        res.render("pages/all_recipes", {recipes:recipes});
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})

app.post('/recipe', function(req, res){
    console.log("Recipe: " + JSON.stringify(req.body.recipe));
    var newRecipe = new recipes_db(req.body.recipe);
    
    newRecipe.save().then(function(){
        res.send("Added new recipe to database!");
    }).catch(function(err){
        res.err("Failed to add new recipe to database!");
    });
});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});