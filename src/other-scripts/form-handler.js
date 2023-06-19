import calculateCaloriesAndMacrosNeeded from './calories-needed';
import getMealPlan from './mealplan-generator';
//import generateHtmlForMeals from "./display-meal-plan";

//setting up the enviornment
const macroResultsSection = document.querySelector('.macro_results');
macroResultsSection.style.display = 'none';

let macros;

function showUserMacroResults(listOfDataValues) {
  macroResultsSection.style.display = 'block';
  const dataSlots = document.getElementsByClassName('macro_results_data');
  const units = ['kcal', 'g', 'g', 'g'];

  let i = 0;
  while (i < dataSlots.length) {
    dataSlots[i].innerText = `${listOfDataValues[i]} ${units[i]}`;
    i++;
  }
}

//handling the actions of form1
const form1 = document.querySelector('.form1');

form1.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    //getting the forms values
    const userHeight = document.querySelector('#form1_height_input').value;
    const userWeight = document.querySelector('#form1_weight_input').value;
    const userAge = document.querySelector('#form1_age_input').value;
    const userGender = document.querySelector(
      'input[name="form1_gender_radio"]:checked'
    ).value;
    const userActivityLevel = document.querySelector(
      'input[name="form1_activity_level_radio"]:checked'
    ).value;
    const userWeightGoal = document.querySelector(
      'input[name="form1_weight_goal_radio"]:checked'
    ).value;
    const userDietType = document.querySelector(
      'input[name="form1_diet_type_radio"]:checked'
    ).value;
    const allergiesElements = document.querySelectorAll(
      'input[name="form1_allergies"]:checked'
    );
    const allergies = [];
    allergiesElements.forEach((allergyElement) =>
      allergies.push(allergyElement.value)
    );

    //putting together the diet
    const userMacros = calculateCaloriesAndMacrosNeeded(
      userWeight,
      userHeight,
      userAge,
      userGender,
      userActivityLevel,
      userWeightGoal
    );

    showUserMacroResults([
      userMacros.caloriesNeeded,
      userMacros.protein,
      userMacros.carbohydrates,
      userMacros.fat,
    ]);

    userMacros.allergies = allergies;
    userMacros.dietType = userDietType;
    macros = userMacros;
  } catch (e) {
    alert(`An error occured submitting the form, ${new Error(e)}`);
  }
});

//handling the get meal plan 'event'
const form1GetMealPlanButton = document.querySelector(
  '#macro_results_get_meal_plan_button'
);

form1GetMealPlanButton.addEventListener('click', async () => {
  try {
    const meals = await getMealPlan(macros);
    meals.push([macros]);
    localStorage.setItem('meals', JSON.stringify(meals));
    window.location.pathname = '/meal-plan.html';
  } catch (e) {
    alert(`An error occured getting the meals, ${new Error(e)}`);
  }
});

//handling the actions of form2
const form2 = document.querySelector('#form2');

form2.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    //getting the forms values
    const userDietType = document.querySelector(
      '#form2_diet_type_select'
    ).value;
    const userCalories = document.querySelector('#form2_calories').value;
    const userProtein = document.querySelector('#form2_protein').value;
    const userFat = document.querySelector('#form2_fat').value;
    const userCarbohydrates = document.querySelector(
      '#form2_carbohydrates'
    ).value;
    const allergiesElements = document.querySelectorAll(
      'input[name="form1_allergies"]:checked'
    );
    const allergies = [];
    allergiesElements.forEach((allergyElement) =>
      allergies.push(allergyElement.value)
    );

    //checking if the macros check up
    const caloriesDontMatchMacros =
      userProtein * 4 + userFat * 9 + userCarbohydrates * 4 - 150 >
        userCalories ||
      userProtein * 4 + userFat * 9 + userCarbohydrates * 4 + 150 <
        userCalories;

    if (caloriesDontMatchMacros) {
      //return alert('Please check that the macros and calories match.');
      document.querySelector(
        '#form2_error_message'
      ).innerHTML = `<p>Please check that the macros and calories match.</p>`;
      return;
    }

    macros = {
      caloriesNeeded: userCalories,
      carbohydrates: userCarbohydrates,
      protein: userProtein,
      fat: userFat,
      allergies,
      dietType: userDietType,
    };

    const meals = await getMealPlan(macros);
    meals.push([macros]);
    localStorage.setItem('meals', JSON.stringify(meals));
    window.location.pathname = '/meal-plan.html';
  } catch (e) {
    alert(`An error occured submitting the form, ${new Error(e)}`);
  }
});
