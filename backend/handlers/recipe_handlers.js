const Recipe = require("../models/recipe");

async function getAllRecipes(req, res) {
    console.log("Find all recipes");
    var recipes = await Recipe.find();
    return recipes;
}

async function createNewRecipe(req, res) {
    const newRecipeInfo = req.body;
    const newRecipe = await Recipe.create(newRecipeInfo);
    console.log(`Added new recipe ${newRecipe.name}`);
    // res.redirect("/")
    res.json(newRecipe);
}

module.exports = {
    getAllRecipes,
    createNewRecipe,
}