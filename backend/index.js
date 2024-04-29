var express = require('express');
var mongoose = require('mongoose');
const recipeRouter = require("./routers/recipe_routers");
const ingredientRouter = require("./routers/ingredient_routers");
const viewRouter = require("./routers/view_routers");
const dietCategoryRouter = require("./routers/diet_category_routers");


// --------------- Database connection ------------------
const DB_URI = "mongodb://localhost:27017/test";
// const DB_URI = "mongodb+srv://ntphuong163:Kangaroo163CSDebugger@devcluster.live9az.mongodb.net/test";

mongoose.connection.on("connected", () => console.log("Database connected."));
mongoose
    .connect(DB_URI)
    .catch(err => console.log(`Database connection error: ${err}`));

// --------------- App initialization -------------------
var app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

app.use("/", viewRouter);
app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use("/diet_category", dietCategoryRouter);

// ---------------- App run ------------------------------
app.listen(PORT, function() {
    console.log("App listening on port " + PORT + " !");
});