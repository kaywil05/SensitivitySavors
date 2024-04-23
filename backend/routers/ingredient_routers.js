const express = require('express');
const router = express.Router();
const ingredientHandler = require("../handlers/ingredient_handers");

router.post("/new", ingredientHandler.addNewIngredient);
router.get("/find_all", ingredientHandler.getAllIngredients);

module.exports = router