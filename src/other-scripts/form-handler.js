import calculateCaloriesAndMacrosNeeded from "./calories-needed";
import getMealPlan from "./mealplan-generator";
//import generateHtmlForMeals from "./display-meal-plan";

//checking the page 
function getCurrentUrl() {
    console.log(window.location.pathname)
    return window.location.pathname;
}

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


//handling the get meal plan 'event'
const form1GetMealPlanButton = document.querySelector('#macro_results_get_meal_plan_button');
    
form1GetMealPlanButton.addEventListener('click', async () => {
    console.log('trying to generate some meal plan');
    const meals = await getMealPlan(macros);
    console.log(meals);
    meals.push([macros]);
    localStorage.setItem("meals", JSON.stringify(meals));
    window.location.pathname = '/meal-plan.html';
});

//handling the actions of form2
const form2 = document.querySelector('#form2');

form2.addEventListener('submit', async (e) => {
    e.preventDefault();

    //getting the forms values
    const userDietType = document.querySelector('#form2_diet_type_select').value;
    const userCalories = document.querySelector('#form2_calories').value;
    const userProtein = document.querySelector('#form2_protein').value;
    const userFat = document.querySelector('#form2_fat').value;
    const userCarbohydrates = document.querySelector('#form2_carbohydrates').value;
    const allergiesElements = document.querySelectorAll('input[name="form1_allergies"]:checked');
    const allergies = [];
    allergiesElements.forEach((allergyElement) => allergies.push(allergyElement.value));

    //checking if the macros check up 
    console.log(((userProtein * 4 + userFat * 9 + userCarbohydrates * 4) - 150) > userCalories)
    const caloriesDontMatchMacros = ((userProtein * 4 + userFat * 9 + userCarbohydrates * 4) - 150) > userCalories || ((userProtein * 4 + userFat * 9 + userCarbohydrates * 4) + 150) < userCalories;

    if (!caloriesDontMatchMacros) {
        macros = {
            caloriesNeeded: userCalories,
            carbohydrates: userCarbohydrates,
            protein: userProtein,
            fat: userFat,
            allergies,
            dietType: userDietType
        };
        
        console.log('trying to generate some meal plan');
        const meals = await getMealPlan(macros);
        console.log(meals);
        meals.push([macros]);
        localStorage.setItem("meals", JSON.stringify(meals));
        window.location.pathname = '/meal-plan.html';
    } else {
        alert("Please check that the macros and calories match.")
    };
});