var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    name: String,
    author: String, 
    ingredients_amount: Number,
    ingredients_object: String
});

recipeSchema.statics.listAllRecipes = function() {
    return this.find({});
};

var recipes_db = mongoose.model('recipe', recipeSchema);

module.exports = recipes_db;

