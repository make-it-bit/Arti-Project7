//keys to a random API, with no payment, no .env file needed
const API_ID = 'cccf4bab';
const API_KEY = '0697729895b68a38aee3a528944a33b2';
//generate requests here https://developer.edamam.com/edamam-docs-recipe-api#/

async function getMealPlan(objectWithMacros) {
    //tests
    console.log('meal plan generator called with', objectWithMacros);
    /*const result = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=%22chicken%22&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09`);
    const data = await result.json();
    console.log(data)*/

    //getting the macros for each meal of the day
    const breakfastMacros = {
        calories: Math.floor(objectWithMacros.caloriesNeeded * 0.3),
        protein: Math.floor(objectWithMacros.protein * 0.3),
        carbohydrates: Math.floor(objectWithMacros.carbohydrates * 0.3),
        fat: Math.floor(objectWithMacros.fat * 0.3)
    };
    const lunchMacros = {
        calories: Math.floor(objectWithMacros.caloriesNeeded * 0.4),
        protein: Math.floor(objectWithMacros.protein * 0.4),
        carbohydrates: Math.floor(objectWithMacros.carbohydrates * 0.4),
        fat: Math.floor(objectWithMacros.fat * 0.4)
    };
    const dinnerMacros = {
        calories: Math.floor(objectWithMacros.caloriesNeeded * 0.3),
        protein: Math.floor(objectWithMacros.protein * 0.3),
        carbohydrates: Math.floor(objectWithMacros.carbohydrates * 0.3),
        fat: Math.floor(objectWithMacros.fat * 0.3)
    };

    //getting 7 breakfasts
    const breakfastCalorieRange = `${breakfastMacros.calories - 100}-${breakfastMacros.calories + 100}`;
    console.log('breakfastCalorieRange: ', breakfastCalorieRange);
    const breakfastCarbohydrateRange = `${breakfastMacros.carbohydrates - 5}-${breakfastMacros.carbohydrates + 5}`;
    console.log('breakfastCarbohydrateRange: ', breakfastCarbohydrateRange);
    const breakfastFatRange = `${breakfastMacros.fat - 5}-${breakfastMacros.fat + 5}`
    console.log('BreakfastFatRange: ', breakfastFatRange);
    const breakfastProteinRange = `${breakfastMacros.protein - 5}-${breakfastMacros.protein + 5}`
    console.log('breakfastProteinRange: ', breakfastProteinRange);
    
    //https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=30-150&nutrients%5BENERC_KCAL%5D=400-500&nutrients%5BFAT%5D=20-30&nutrients%5BPROCNT%5D=30-40
    //https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast%nutrients%5BCHOCDF%5D=115-125&nutrients%5BENERC_KCAL%5D=918-1018&nutrients%5BFAT%5D=16-26&nutrients%5BPROCNT%5D=67-77
    const breakfastsRequest = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&nutrients%5BFAT%5D=${breakfastFatRange}&nutrients%5BPROCNT%5D=${breakfastProteinRange}`);
    const breakfasts = await breakfastsRequest.json();
    console.log(breakfasts);
};

export default getMealPlan;