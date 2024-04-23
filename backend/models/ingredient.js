const mongoose = require("mongoose");
const {Schema, model} = mongoose;

var ingredientSchema = new Schema({
    name: {type: String, require: true},
    quantity: {type: Number, require: true},
    unit: {type: String, require: true},
    note: {type: String, require: true},
})

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;