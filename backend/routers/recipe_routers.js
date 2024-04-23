const express = require('express');
const router = express.Router();
const recipeHandler = require("../handlers/recipe_handlers");

router.get("/find_all", recipeHandler.getAllRecipes);

router.post("/new", recipeHandler.createNewRecipe);

module.exports = router