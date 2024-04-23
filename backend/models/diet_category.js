const mongoose = require("mongoose");
const {Schema, model} = mongoose;

var dietCategorySchema = new Schema({
    dietCategory: {type: String, require: true},
    description: {type: String, require: true},
})

const DietCategory = model("DietCategory", dietCategorySchema);

module.exports = DietCategory;