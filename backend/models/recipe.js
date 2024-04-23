const mongoose = require("mongoose");
const {Schema, model} = mongoose;
const DietCategory = require("./diet_category");
const Ingredient = require("./ingredient");

var recipeSchema = new Schema({
    name: String,
    author: String, 
    prep_time: Number, // in seconds, 
    cook_time: Number, // in seconds
    total_time: Number, // in seconds
    categories: [{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "DietCategory",
    }],
    ingredients: [{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Ingredient",
    }],
    instructions: [String],
    image_url: String,
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;