const recipeHandlers = require("./recipe_handlers")

function homePageHandler(req, res) {
    res.render("pages/index");
}

function formPageHandler(req, res) {
    res.render("pages/form")
}

function recipesPageHandler(req, res) {
    // const allRecipes = await recipeHandlers.getAllRecipes();
    const allRecipes = [
        {
            _id: "dfsafs",
            name: "fdsfsafds",
            image_url: "fdasfs",
        },
        {
            _id: "dfsafs",
            name: "fdsfsafds",
            image_url: "fdasfs",
        },
        {
            _id: "dfsafs",
            name: "fdsfsafds",
            image_url: "fdasfs",
        },
    ]
    res.render("pages/all_recipes", {recipes: allRecipes});
}


module.exports = {
    homePageHandler,
    formPageHandler,
    recipesPageHandler,
}