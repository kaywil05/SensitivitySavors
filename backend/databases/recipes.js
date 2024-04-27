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

    // ex. 1 Tbsp chili pepper (crushed)

    name: String, // ex. chili pepper
    measurement_number: String, // ex. 1 - needs to be string to allow for decimals
    measurement_unit: String, // ex. Tbsp
    parenthesis_note: String, // (crushed)
});

var instructionsSchema = new mongoose.Schema({
    step: String,
});

var recipeSchema = new mongoose.Schema({
    name: String,
    author: String, 
    prep_time: String, // in seconds, 
    cook_time: String, // in seconds
    total_time: String, // in seconds
    servings: Number,
    category: [dietCategorySchema],
    ingredients: [ingredientSchema],
    instructions: [instructionsSchema],
    image_url: String,
});

recipeSchema.statics.listAllRecipes = function() {
    return this.find({});
};

var recipes_db = mongoose.model('recipe', recipeSchema);

module.exports = recipes_db;

