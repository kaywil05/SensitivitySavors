var mongoose = require("mongoose");

var dietCategorySchema = new mongoose.Schema({
    dairy_free: Boolean,
    gluten_free: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    contains_nuts: Boolean,
    contains_eggs: Boolean,
    contains_soy: Boolean,
});

var ingredientSchema = new mongoose.Schema({

    // ex. 1 Tbsp chili powder

    name: String, // ex. chili powder
    measurement_number: String, // ex. 1 - needs to be string to allow for decimals
    measurement_unit: String, // ex. Tbsp
});

var instructionsSchema = new mongoose.Schema({
    step: String,
});

var recipeSchema = new mongoose.Schema({
    name: String,
    author: String, 
    prep_time: String, // ex. '10 minutes'
    cook_time: String, // ex. '25 minutes'
    total_time: String, // ex. '35 minutes'
    servings: Number,
    category: [dietCategorySchema],
    ingredients: [ingredientSchema],
    instructions: [instructionsSchema],
});

recipeSchema.statics.listAllRecipes = function() {
    return this.find({});
};

var recipes_db = mongoose.model('recipe', recipeSchema);

module.exports = recipes_db;

