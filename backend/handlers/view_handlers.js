const recipeHandlers = require("./recipe_handlers");
const DietCategory = require("../models/diet_category");

function homePageHandler(req, res) {
    res.render("pages/index");
}

async function formPageHandler(req, res) {
    const dietCategories = await DietCategory.find();
    const listCategories = dietCategories.map(cate => {return cate});
    // const listUniqueCategories = [...new Set(listCategories)];
    // console.log(listUniqueCategories);
    // console.log(listCategories);
    res.render("pages/newform", {categories: listCategories});
}

async function recipesPageHandler(req, res) {
    const allRecipes = await recipeHandlers.getAllRecipes();
    res.render("pages/all_recipes", {recipes: allRecipes});
}


module.exports = {
    homePageHandler,
    formPageHandler,
    recipesPageHandler,
}