import calculateCaloriesAndMacrosNeeded from "./calories-needed";

//setting up the enviornment
const macroResultsSection = document.querySelector('.macro_results');
macroResultsSection.style.display = 'none';

//handling the actions of form1
const form1 = document.querySelector('.form1');
const form1SubmitButton = document.querySelector('#form1_submit_button');

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

    //putting together the diet
    const caloriesNeeded = calculateCaloriesAndMacrosNeeded(userWeight, userHeight, userAge, userGender, userActivityLevel, userWeightGoal);
    console.log('caloriesNeeded: ', caloriesNeeded);

});