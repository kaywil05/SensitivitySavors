const express = require('express');
const router = express.Router();
const recipeHandler = require("../handlers/recipe_handlers");

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.post("/new", upload.single("profile-pic"), recipeHandler.createNewRecipe);
router.get("/find_all", recipeHandler.getAllRecipes);
router.get("/:recipeId", recipeHandler.findRecipeByID);

module.exports = router