function submitRecipe(formElement) {
    var formData = new FormData(formElement);
    var recipeData = {
        name: formData.name,
        author: formData.author,
        // image_url: formData.image_url,
        prep_time_min: formData.prep_time_min,
        prep_time_sec: formData.prep_time_sec,
        cook_time_min: formData.cook_time_min,
        cook_time_sec: formData.cook_time_sec,
        totat_time_min: formData.totat_time_min,
        totat_time_sec: formData.totat_time_sec,
        categories: getDietCategories(),
        ingredients: getIngredients(),
        instructions: getInstrunctions(),
    }
    // console.log(recipeData);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
        } else {
            console.error('Request failed with status ' + xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send(recipeData);
}

function getDietCategories() {
    const catEle = document.getElementById("categories");
    var selectedValues = [];
    for (var i = 0; i < catEle.options.length; i++) {
        var option = catEle.options[i];
        if (option.selected) {
            selectedValues.push(option.value);
        }
    }
    return selectedValues;
}

function getInstrunctions() {
    const instructionEles = Array.from(document.getElementsByClassName("instruction"));
    const instructions = instructionEles.map((ele) => {
        const instruction = ele.getElementsByTagName("textarea")[0].value.step;
        return instruction;
    });
    return instructions;
}

function getIngredients() {
    const ingredientElements = Array.from(document.getElementsByClassName("ingredient"));
    const ingredients = ingredientElements.map((ele) => {
        const ingredient = {
            name: ele.getElementsByClassName("ingredient_name")[0].value,
            quantity: ele.getElementsByClassName("ingredient_quantity")[0].value,
            unit: ele.getElementsByClassName("ingredient_unit")[0].value,
            note: ele.getElementsByClassName("ingredient_note")[0].value,
        }
        return ingredient;
    });
    return ingredients;
}

function addIngredient() {
    var ingredientDiv = document.createElement('div');
    ingredientDiv.classList.add('ingredient');
    ingredientDiv.innerHTML = `
        <label for="ingredient_name">Name:</label>
        <input type="text" class="ingredient_name" name="ingredients[${document.querySelectorAll('.ingredient').length}][name]"><br>
        <label for="ingredient_quantity">Quantity:</label>
        <input type="number" class="ingredient_quantity" name="ingredients[${document.querySelectorAll('.ingredient').length}][quantity]"><br>
        <label for="ingredient_unit">Unit:</label>
        <input type="text" class="ingredient_unit" name="ingredients[${document.querySelectorAll('.ingredient').length}][unit]"><br>
        <label for="ingredient_note">Optional Note:</label>
        <input type="text" class="ingredient_note" name="ingredients[${document.querySelectorAll('.ingredient').length}][note]"><br>
    `;
    document.getElementById('ingredients').appendChild(ingredientDiv);
}

function addInstruction() {
    var instructionDiv = document.createElement('div');
    instructionDiv.classList.add('instruction');
    instructionDiv.innerHTML = `
        <label for="instruction">Step ${document.querySelectorAll('.instruction').length + 1}:</label>
        <textarea name="instructions[${document.querySelectorAll('.instruction').length}][step]"></textarea>
    `;
    document.getElementById('instructions').appendChild(instructionDiv);
}

async function askChatBot(event) {
    event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// Accept: "application/json",
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

    const answer =  await response.json();
    var answer_box = document.getElementById("answer");
    answer_box.innerText = answer["Answer"];
}

// var askButton = document.getElementById("ask");
// askButton.addEventListener('click', fetchAnswer);

async function fetchAnswer() {
    const inputEle = document.getElementById("question");
    const formData = new FormData();
    formData.append("question", inputEle.value);

    try {
        const response = await fetch(
            "http://localhost:8000/query",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Accept": "application/json"
                },
                body: JSON.stringify(formData),
            }
        )
        const data = await response.json();
        const answerBox = document.getElementById("answer");
        answerBox.innerText = data.answer;
    }
    catch (error) {
        console.error(`Error: ${error}`);
        // alert("Failed!");
    }
}