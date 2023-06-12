//function for generating the HTML elements that display the info of the meals for the day
function generateHtmlForMeals(objectWithArrays) {
    console.log(objectWithArrays);
    
    const mealplanResultsSection = document.querySelector('#meal_plan_results');

    function generateHtmlForOneDay(numberOfDay, breakfast, lunch, dinner, macros) {
        const parentDiv = document.createElement('div');

        const headerForTheDay = document.createElement('h2');
        headerForTheDay.innerText = `Day ${numberOfDay}`;
        parentDiv.appendChild(headerForTheDay);
        
        //creating breakfast's element
        const breakfastDiv = document.createElement('div');
        
        const breakfastHeader = document.createElement('h3');
        breakfastHeader.innerText = `Breakfast - ${breakfast.recipe.label}`;
        breakfastDiv.appendChild(breakfastHeader);

        const breakfastWeight = document.createElement('p');
        breakfastWeight.innerText = `Amount: ${Math.floor((macros[0].caloriesNeeded * 30) / ((breakfast.recipe.calories / breakfast.recipe.totalWeight) * 100))}g`
        breakfastDiv.appendChild(breakfastWeight);

        const breakfastInfoLabel = document.createElement('p');
        breakfastInfoLabel.innerText = 'Macronutrients per 100g:';
        breakfastDiv.appendChild(breakfastInfoLabel);

        //making a bootstrap row 
        const breakfastMacros = document.createElement('div');
        breakfastMacros.setAttribute('class', 'row');

        const breakfastCaloriesElement = document.createElement('p');
        breakfastCaloriesElement.setAttribute('class', 'col-lg');
        breakfastCaloriesElement.innerText = `${Math.floor((breakfast.recipe.calories / breakfast.recipe.totalWeight) * 100)} kcal`;
        breakfastMacros.appendChild(breakfastCaloriesElement);

        const breakfastProteinElement = document.createElement('p');
        breakfastProteinElement.setAttribute('class', 'col-lg');
        breakfastProteinElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.PROCNT.quantity / breakfast.recipe.totalWeight) * 100)}g of Protein`
        breakfastMacros.appendChild(breakfastProteinElement);

        const breakfastCarbohydrateElement = document.createElement('p');
        breakfastCarbohydrateElement.setAttribute('class', 'col-lg');
        breakfastCarbohydrateElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.CHOCDF.quantity / breakfast.recipe.totalWeight) * 100)}g of Carbs`
        breakfastMacros.appendChild(breakfastCarbohydrateElement);

        
        const breakfastFatElement = document.createElement('p');
        breakfastFatElement.setAttribute('class', 'col-lg')
        breakfastFatElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.FAT.quantity / breakfast.recipe.totalWeight) * 100)}g of Fat`;
        breakfastMacros.appendChild(breakfastFatElement);
        
        breakfastDiv.appendChild(breakfastMacros);

        const breakfastImageElement = document.createElement('img');
        breakfastImageElement.src = breakfast.recipe.images.REGULAR.url;
        breakfastImageElement.alt = 'Picture of the meal';
        breakfastDiv.appendChild(breakfastImageElement);

        const breakfastLinkToRecipe = document.createElement('a');
        breakfastLinkToRecipe.innerText = 'Find out more';
        breakfastLinkToRecipe.href = breakfast.recipe.url;
        breakfastDiv.appendChild(breakfastLinkToRecipe);

        parentDiv.appendChild(breakfastDiv);
        
        //creating lunch's element
        const lunchDiv = document.createElement('div');
        
        const lunchHeader = document.createElement('h3');
        lunchHeader.innerText = `Lunch - ${lunch.recipe.label}`;
        lunchDiv.appendChild(lunchHeader);

        const lunchWeight = document.createElement('p');
        lunchWeight.innerText = `Amount: ${Math.floor((macros[0].caloriesNeeded * 30) / ((lunch.recipe.calories / lunch.recipe.totalWeight) * 100))}g`
        lunchDiv.appendChild(lunchWeight);

        const lunchInfoLabel = document.createElement('p');
        lunchInfoLabel.innerText = 'Macronutrients per 100g:';
        lunchDiv.appendChild(lunchInfoLabel);
        
        const lunchCaloriesElement = document.createElement('p');
        lunchCaloriesElement.innerText = `${Math.floor((lunch.recipe.calories / lunch.recipe.totalWeight) * 100)} kcal`;
        lunchDiv.appendChild(lunchCaloriesElement);
        
        const lunchProteinElement = document.createElement('p');
        lunchProteinElement.innerText = `${Math.floor((lunch.recipe.totalNutrients.PROCNT.quantity / lunch.recipe.totalWeight) * 100)}g of Protein`
        lunchDiv.appendChild(lunchProteinElement);
        
        const lunchCarbohydrateElement = document.createElement('p');
        lunchCarbohydrateElement.innerText = `${Math.floor((lunch.recipe.totalNutrients.CHOCDF.quantity / lunch.recipe.totalWeight) * 100)}g of Carbs`
        lunchDiv.appendChild(lunchCarbohydrateElement);
        
        const lunchFatElement = document.createElement('p');
        lunchFatElement.innerText = `${Math.floor((lunch.recipe.totalNutrients.FAT.quantity / lunch.recipe.totalWeight) * 100)}g of Fat `;
        lunchDiv.appendChild(lunchFatElement);
        
        const lunchImageElement = document.createElement('img');
        lunchImageElement.src = lunch.recipe.images.REGULAR.url;
        lunchImageElement.alt = 'Picture of the meal';
        lunchDiv.appendChild(lunchImageElement);
        
        const lunchLinkToRecipe = document.createElement('a');
        lunchLinkToRecipe.innerText = 'Find out more';
        lunchLinkToRecipe.href = lunch.recipe.url;
        lunchDiv.appendChild(lunchLinkToRecipe);
        
        parentDiv.appendChild(lunchDiv);

        //creating dinner element
        const dinnerDiv = document.createElement('div');
        
        const dinnerHeader = document.createElement('h3');
        dinnerHeader.innerText = `Dinner - ${dinner.recipe.label}`;
        dinnerDiv.appendChild(dinnerHeader);

        const dinnerWeight = document.createElement('p');
        dinnerWeight.innerText = `Amount: ${Math.floor((macros[0].caloriesNeeded * 30) / ((dinner.recipe.calories / dinner.recipe.totalWeight) * 100))}g`
        dinnerDiv.appendChild(dinnerWeight);

        const dinnerInfoLabel = document.createElement('p');
        dinnerInfoLabel.innerText = 'Macronutrients per 100g:';
        dinnerDiv.appendChild(dinnerInfoLabel);

        const dinnerCaloriesElement = document.createElement('p');
        dinnerCaloriesElement.innerText = `${Math.floor((dinner.recipe.calories / dinner.recipe.totalWeight) * 100)} kcal`;
        dinnerDiv.appendChild(dinnerCaloriesElement);

        const dinnerProteinElement = document.createElement('p');
        dinnerProteinElement.innerText = `${Math.floor((dinner.recipe.totalNutrients.PROCNT.quantity / dinner.recipe.totalWeight) * 100)}g of Protein`
        dinnerDiv.appendChild(dinnerProteinElement);

        const dinnerCarbohydrateElement = document.createElement('p');
        dinnerCarbohydrateElement.innerText = `${Math.floor((dinner.recipe.totalNutrients.CHOCDF.quantity / dinner.recipe.totalWeight) * 100)}g of Carbs`
        dinnerDiv.appendChild(dinnerCarbohydrateElement);

        const dinnerFatElement = document.createElement('p');
        dinnerFatElement.innerText = `${Math.floor((dinner.recipe.totalNutrients.FAT.quantity / dinner.recipe.totalWeight) * 100)}g of Fat`;
        dinnerDiv.appendChild(dinnerFatElement);

        const dinnerImageElement = document.createElement('img');
        dinnerImageElement.src = dinner.recipe.images.REGULAR.url;
        dinnerImageElement.alt = 'Picture of the meal';
        dinnerDiv.appendChild(dinnerImageElement);

        const dinnerLinkToRecipe = document.createElement('a');
        dinnerLinkToRecipe.innerText = 'Find out more';
        dinnerLinkToRecipe.href = dinner.recipe.url;
        dinnerDiv.appendChild(dinnerLinkToRecipe);

        parentDiv.appendChild(dinnerDiv);
        
        return parentDiv;
    };

    let i = 0;
    while (i < 7) {
        const dataToDisplay = generateHtmlForOneDay((i + 1), objectWithArrays[0][i], objectWithArrays[1][i], objectWithArrays[2][i], objectWithArrays[3]);
        mealplanResultsSection.appendChild(dataToDisplay);
        i++
    }
};

generateHtmlForMeals(JSON.parse(localStorage.getItem("meals")));

//export default generateHtmlForMeals;