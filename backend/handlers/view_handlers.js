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
    try {
        const recipes = await recipeHandlers.getAllRecipes(req, res);
        res.render('pages/all_recipes', { recipes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    // new stuff
    // const recipes = await recipeHandlers.getAllRecipes(req, res);

    // //extract filter from query parameters
    // const {dietary} = req.query;

    // let query = {};
    // if(dietary){
    //     query = {dietCategory: {$in:Array.isArray(dietary) ? dietary : [dietary] }};
    // }
    // console.log(dietary);


    // try {
    //     const recipes = dietary ? await Recipe.find(query) : await recipeHandlers.getAllRecipes(req, res);
    //     res.render('pages/all_recipes', { recipes : recipes });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    // }
}

function qaPageHandler(req, res) {
    res.render("pages/q_a_chat", {
        question: undefined,
        pred: undefined
    });
}

module.exports = {
    homePageHandler,
    formPageHandler,
    recipesPageHandler,
    qaPageHandler
}