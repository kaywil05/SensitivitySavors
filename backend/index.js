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

// Take user to form
app.get("/form", function(req, res){
    res.render("pages/form");
});

// Take user to see all recipes
app.get("/all_recipes", function(req,res) {
    recipes_db.listAllRecipes().then(function(recipes){
        res.render("pages/all_recipes", {recipes:recipes});
    }).catch(function(error){ 
        res.error("Something went wrong!" + error );
    });
    
})

// Post request to add new recipes into database
app.post('/add_recipe', function(req, res){

    var { name, author, image, prep_time, cook_time, total_time, servings, category, ingredients, instructions } = req.body;

    var newRecipe = new recipes_db({
        name: name,
        author: author,
        image_url: image_url,
        prep_time: prep_time,
        cook_time: cook_time,
        total_time: total_time,
        servings: servings,
        category: category, // category is an array of booleans
        ingredients: ingredients, // ingredients is an array of objects
        instructions: instructions // ingredients is an array of strings
    });

    newRecipe.save().then(function(){
        res.send("Added new recipe to database!");
    }).catch(function(err){
        res.status(500).send("Failed to add new recipe to database!" + err);
    });
});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});