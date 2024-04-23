const Ingredient = require("../models/ingredient");

async function addNewIngredient(req, res) {
    const ingredientInfo = req.body;
    console.log(ingredientInfo);
    const newIngredient = await Ingredient.create(ingredientInfo);
    res.json({ingredient: newIngredient});
}

async function getAllIngredients(req, res) {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
}

module.exports = {
    addNewIngredient,
    getAllIngredients,
}