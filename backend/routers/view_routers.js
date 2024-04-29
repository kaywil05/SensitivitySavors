const express = require('express');
const router = express.Router();
const viewHandler = require("../handlers/view_handlers");
var recipes_db = require("../databases/recipes");
// const Recipe = require("../models/recipe");

router.get("/", viewHandler.homePageHandler);
router.get("/index", viewHandler.homePageHandler);
router.get("/form", viewHandler.formPageHandler);
router.get("/all_recipes", viewHandler.recipesPageHandler);
router.get("/q_a_chat", viewHandler.qaPageHandler);

// Post request to add new recipes into database
router.post('/add_recipe', function(req, res){

    var { name, author, image_url, prep_time, cook_time, total_time, servings, category, ingredients, instructions } = req.body;

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

// grab individual recipe id and display all recipe info from database
router.get('/recipe_details/:recipeId', function(req, res) {
    recipes_db.findById(req.params.recipeId).then(function(recipe){
        res.render("pages/recipe_details", {recipe:recipe});
    });
});

module.exports = router