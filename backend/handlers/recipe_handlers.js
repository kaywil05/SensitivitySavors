const Recipe = require("../models/recipe");
const DietCategory = require("../models/diet_category");
const Ingredient = require("../models/ingredient");
const { Server } = require("socket.io");


async function getAllRecipes(req, res) {
    console.log("Find all recipes");
    var recipes = await Recipe.find();
    return recipes;
}

async function createNewRecipe(req, res) {
    const recipeInfo = req.body;
    const image_url = `uploads/${req.file.filename}`;
    // console.log(`Uploaded file: ${JSON.stringify(req.file)}`);
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
        image_url: image_url
    });
    console.log(`Added new recipe ${newRecipe.name}`);
    res.redirect("/all_recipes");
}

async function findRecipeByID(req, res) {
    const recipe = await Recipe.findById(req.params.recipeId);

    // Convert time fields from seconds into minutes for client
    recipe.prep_time = convertSecondsToMinutes(recipe.prep_time);
    recipe.cook_time = convertSecondsToMinutes(recipe.cook_time);
    recipe.total_time = convertSecondsToMinutes(recipe.total_time);

    // image_url = `${}/${recipe.image_url}`
    var categories = [];
    for (const catId of recipe.categories) {
        const dietCategory = await DietCategory.findById(catId);
        categories.push(dietCategory);
    };
    var ingredients = [];
    for (const ingredientId of recipe.ingredients) {
        const ingredient = await Ingredient.findById(ingredientId);
        ingredients.push(ingredient);
    };
    // console.log(categories);
    // console.log(ingredients);
    // TODO: Error handling here
    res.render(
        "pages/recipe_details",
        {recipe: recipe, ingredients: ingredients, categories: categories}
    );
}

// Function to convert seconds to minutes
function convertSecondsToMinutes(seconds) {
    return Math.floor(seconds / 60);
}

module.exports = {
    getAllRecipes,
    createNewRecipe,
    findRecipeByID,
}