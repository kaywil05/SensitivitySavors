const recipeHandlers = require("./recipe_handlers");
const DietCategory = require("../models/diet_category");
const Recipe = require('../models/recipe');

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
    //res.render("pages/all_recipes", {recipes: allRecipes});

    //Extract filter from query parameters
    const { dietary } = req.query;

    //Build query based on filters
    let query = {};
    if(dietary) {
        query = {dietCategory: {$in:Array.isArray(dietary) ? dietary : [dietary] }};
    }
    console.log(dietary);
    //console.log(dietCategory);

    try{
        //fetch filtered recipies from the database
        const recipes = dietary ? await Recipe.find(query) : await Recipe.find();

        //Render the pages with filtered recipes
        res.render('pages/all_recipes', {recipes: recipes});

    }
    catch (err){
        //handle errors
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

function qaPageHandler(req, res) {
    res.render("pages/q_a_chat");
}

module.exports = {
    homePageHandler,
    formPageHandler,
    recipesPageHandler,
    qaPageHandler
}