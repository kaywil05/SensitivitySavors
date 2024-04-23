const DietCategory = require("../models/diet_category");

async function getAllDietCategories(req, res) {
    const dietCategories = await DietCategory.find();
    return dietCategories;
}

async function addNewDietCategory(req, res) {
    const dietCategoryInfo = req.body;
    console.log(dietCategoryInfo);
    const newDietCategory = await DietCategory.create(dietCategoryInfo);
    res.json(newDietCategory);
}

module.exports = {
    getAllDietCategories,
    addNewDietCategory,
}