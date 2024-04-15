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

app.post('/add_recipe', function(req, res){
    // console.log("Recipe: " + JSON.stringify(req.body.recipe));
    var { name, author, prep_time, cook_time, total_time, servings, category, ingredients } = req.body;
    // var newRecipe = new recipes_db(req.body.recipe);

    var newRecipe = new recipes_db({
        name: name,
        author: author,
        prep_time: prep_time,
        cook_time: cook_time,
        total_time: total_time,
        servings: servings,
        category: category, // Assuming category is an array of objects as received from the form
        ingredients: ingredients // Assuming ingredients is an array of objects as received from the form
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