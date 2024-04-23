const express = require('express');
const router = express.Router();
const dietCategoryHandler = require("../handlers/diet_category_handlers");

router.post("/new", dietCategoryHandler.addNewDietCategory);
router.get("/find_all", dietCategoryHandler.getAllDietCategories);

module.exports = router