var mongoose = require("mongoose");

var dietCategorySchema = new mongoose.Schema({
    dairy_free: Boolean,
    gluten_free: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    nut_allergy_friendly: Boolean,
    egg_allergy_friendly: Boolean,
    soy_allergy_friendly: Boolean
})

var ingredientSchema = new mongoose.Schema({

    // ex. 1 Tbsp chili powder

    name: String, // ex. chili powder
    measurement_number: Number, // ex. 1
    measurement_unit: String, // ex. Tbsp
})

var recipeSchema = new mongoose.Schema({
    name: String,
    author: String, 
    prep_time: String, // ex. '10 minutes'
    cook_time: String, // ex. '25 minutes'
    total_time: String, // ex. '35 minutes'
    servings: Number,
    category: [dietCategorySchema],
    ingredients: [ingredientSchema],
});

recipeSchema.statics.listAllRecipes = function() {
    return this.find({});
};

var recipes_db = mongoose.model('recipe', recipeSchema);

module.exports = recipes_db;

