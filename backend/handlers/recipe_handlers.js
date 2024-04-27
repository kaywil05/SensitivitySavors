const Recipe = require("../models/recipe");
const DietCategory = require("../models/diet_category");
const Ingredient = require("../models/ingredient");

async function getAllRecipes(req, res) {
    console.log("Find all recipes");
    var recipes = await Recipe.find();
    return recipes;
}

async function createNewRecipe(req, res) {
    const recipeInfo = req.body;
    var categoryIds = [];
    if (typeof(recipeInfo.categories) == "string") {
        categoryIds.push(recipeInfo.categories);
    }
    else {
        recipeInfo.categories.forEach((catId) => {
            categoryIds.push(catId);
        })
    }
    var dietCategories = [];
    for (const catId of categoryIds) {
        const dietCategory = await DietCategory.findById(catId);
        dietCategories.push(dietCategory);
    };
    var ingredients = [];
    for (const ingredientInfo of recipeInfo.ingredients) {
        const ingredient = await Ingredient.create(ingredientInfo);
        ingredients.push(ingredient);
    };
    const instructions = recipeInfo.instructions.map((instructionInfo) => {
        const instruction = instructionInfo.step;
        return instruction;
    });
    const newRecipe = await Recipe.create({
        name: recipeInfo.name,
        author: recipeInfo.author,
        prep_time: recipeInfo.prep_time_min*60 + recipeInfo.prep_time_sec,
        cook_time: recipeInfo.cook_time_min*60 + recipeInfo.cook_time_sec,
        total_time: recipeInfo.total_time_min*60 + recipeInfo.total_time_sec,
        categories: dietCategories,
        ingredients: ingredients,
        instructions: instructions,
    });
    console.log(`Added new recipe ${newRecipe.name}`);
    res.redirect("/");
}

module.exports = {
    getAllRecipes,
    createNewRecipe,
}