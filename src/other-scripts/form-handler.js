import calculateCaloriesAndMacrosNeeded from "./calories-needed";
import getMealPlan from "./mealplan-generator";

//setting up the enviornment
const macroResultsSection = document.querySelector('.macro_results');
macroResultsSection.style.display = 'none';

//"global variables
let macros;

//functions for displaying data
//loops the macros into the dom
function showUserMacroResults(listOfDataValues) {
    macroResultsSection.style.display = 'block';
    const dataSlots = document.getElementsByClassName('macro_results_data');
    const units = ['kcal', 'g', 'g', 'g'];
    
    let i = 0;
    while (i < dataSlots.length) {
        dataSlots[i].innerText = `${listOfDataValues[i]} ${units[i]}`;
        i++;
    };
};

//FOR TESTS - DELETE LATER FOR PROD

macroResultsSection.style.display = 'block';

macros = {
    caloriesNeeded: 3229, 
    carbohydrates: 403, 
    protein: 242,
    fat: 71,
    allergies: ['nuts', 'dairy'],
    dietType: 'vegan'
};

showUserMacroResults([macros.caloriesNeeded, macros.protein, macros.carbohydrates, macros.fat]);

//handling the actions of form1
const form1 = document.querySelector('.form1');

form1.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //getting the forms values
    const userHeight = document.querySelector('#form1_height_input').value;
    const userWeight = document.querySelector('#form1_weight_input').value;
    const userAge = document.querySelector('#form1_age_input').value;
    const userGender = document.querySelector('input[name="form1_gender_radio"]:checked').value;
    const userActivityLevel = document.querySelector('input[name="form1_activity_level_radio"]:checked').value;
    const userWeightGoal = document.querySelector('input[name="form1_weight_goal_radio"]:checked').value;
    const userDietType = document.querySelector('input[name="form1_diet_type_radio"]:checked').value;
    const allergiesElements = document.querySelectorAll('input[name="form1_allergies"]:checked');
    const allergies = [];
    allergiesElements.forEach((allergyElement) => allergies.push(allergyElement.value));

    //putting together the diet
    const userMacros = calculateCaloriesAndMacrosNeeded(userWeight, userHeight, userAge, userGender, userActivityLevel, userWeightGoal);

    showUserMacroResults([userMacros.caloriesNeeded, userMacros.protein, userMacros.carbohydrates, userMacros.fat]);

    console.log(userMacros);
    userMacros.allergies = allergies;
    userMacros.dietType = userDietType;
    macros = userMacros;
});

//handling the get meal-plan request by user in form1
const form1GetMealPlanButton = document.querySelector('#macro_results_get_meal_plan_button');
const mealplanResultsSection = document.querySelector('#meal_plan_results')

form1GetMealPlanButton.addEventListener('click', async () => {
    console.log('trying to generate some meal plan');
    const meals = await getMealPlan(macros);
    console.log(meals);
    //add 'data shown per serving' label or smth

    const html = generateHtmlForMeals(meals);
    
    mealplanResultsSection.appendChild(html);
    window.href = '/meal-plan.html'
});


//function for generating the HTML elements that display the info of the meals for the day
function generateHtmlForMeals(objectWithArrays) {
    function generateHtmlForOneDay(numberOfDay, breakfast, dinner, lunch) {
        const parentDiv = document.createElement('div');

        const headerForTheDay = document.createElement('h3');
        headerForTheDay.innerText = `Day ${numberOfDay}`;
        parentDiv.appendChild(headerForTheDay);
        
        //creating breakfast's element
        const breakfastDiv = document.createElement('div');
        
        const breakfastHeader = document.createElement('p');
        breakfastHeader.innerText = `Breakfast - ${breakfast.recipe.label}`;
        breakfastDiv.appendChild(breakfastHeader);

        const caloriesElement = document.createElement('p');
        caloriesElement.innerText = `${Math.floor((breakfast.recipe.calories / breakfast.recipe.totalWeight) * 100)} kcal`;
        breakfastDiv.appendChild(caloriesElement);

        const proteinElement = document.createElement('p');
        proteinElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.PROCNT.quantity / breakfast.recipe.totalWeight) * 100)}g of Protein`
        breakfastDiv.appendChild(proteinElement);

        const carbohydrateElement = document.createElement('p');
        carbohydrateElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.CHOCDF.quantity / breakfast.recipe.totalWeight) * 100)}g of Carbs`
        breakfastDiv.appendChild(carbohydrateElement);

        const fatElement = document.createElement('p');
        fatElement.innerText = `${Math.floor((breakfast.recipe.totalNutrients.FAT.quantity / breakfast.recipe.totalWeight) * 100)}g of Fat`;
        breakfastDiv.appendChild(fatElement);

        const imageElement = document.createElement('img');
        imageElement.src = breakfast.recipe.images.REGULAR.url;
        imageElement.alt = 'Picture of the meal';
        breakfastDiv.appendChild(imageElement);

        const linkToRecipe = document.createElement('a');
        linkToRecipe.innerText = 'Find out more';
        linkToRecipe.href = breakfast.recipe.url;
        breakfastDiv.appendChild(linkToRecipe);

        parentDiv.appendChild(breakfastDiv);

        return parentDiv;
    };

    return generateHtmlForOneDay(1, objectWithArrays[0][0]);
};