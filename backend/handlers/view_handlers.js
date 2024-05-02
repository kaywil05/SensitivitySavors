const recipeHandlers = require("./recipe_handlers");
const dietCategoryHandlers = require("./diet_category_handlers")
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
        const [recipes, checked_categories] = await recipeHandlers.getAllRecipes(req, res);
        const categories = await dietCategoryHandlers.getAllDietCategories(req, res);
        res.render(
            'pages/all_recipes',
            { 
                recipes: recipes, 
                categories: categories,
                checked_categories: checked_categories
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    // new stuff
    // try {
    //     let recipes;
    //     const { dietary } = req.query;

    //     if (dietary) {
    //         // Constructing query based on filters
    //         const query = { dietary: { $in: Array.isArray(dietary) ? dietary : [dietary] } };

    //         // Fetching recipes with filters applied
    //         recipes = await Recipe.find(query);
    //         console.log("DIETARY");
    //         console.log(dietary);
    //     } else {
    //         // Fetching all recipes when no filters are applied
    //         recipes = await recipeHandlers.getAllRecipes(req, res);
    //     }

    //     // Rendering the page with fetched recipes
    //     res.render('pages/all_recipes', { recipes });
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