const express = require('express');
const router = express.Router();
const recipeHandler = require("../handlers/recipe_handlers");

router.post("/new", recipeHandler.createNewRecipe);
router.get("/find_all", recipeHandler.getAllRecipes);
router.get("/:recipeId", recipeHandler.findRecipeByID);

module.exports = router