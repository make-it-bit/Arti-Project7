
//keys to a random API, with no payment, no .env file needed
const API_ID = 'cccf4bab';
const API_KEY = '0697729895b68a38aee3a528944a33b2';
//generate requests here https://developer.edamam.com/edamam-docs-recipe-api#/

async function getMealPlan(objectWithMacros) {
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

    //making a string with ingredients to exclude, if needed 
    let excludedIngredients = 'excluded=';
    if (objectWithMacros.allergies) {
        let i = 0;
        while (i < objectWithMacros.allergies.length) {
            excludedIngredients = excludedIngredients + objectWithMacros.allergies[i];
            if ((objectWithMacros.allergies.length - (i - 1)) >= 0) {
                excludedIngredients =  excludedIngredients + '%20';
            };
            i ++;
        };
    };

    //getting 7 breakfasts
    const breakfastCalorieRange = `${breakfastMacros.calories - 100}-${breakfastMacros.calories + 100}`;
    const breakfastCarbohydrateRange = `${breakfastMacros.carbohydrates - 5}-${breakfastMacros.carbohydrates + 5}`;
    const breakfastFatRange = `${breakfastMacros.fat - 5}-${breakfastMacros.fat + 5}`;
    const breakfastProteinRange = `${breakfastMacros.protein - 5}-${breakfastMacros.protein + 5}`;
    
    //https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=30-150&nutrients%5BENERC_KCAL%5D=400-500&nutrients%5BFAT%5D=20-30&nutrients%5BPROCNT%5D=30-40
    //https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast%nutrients%5BCHOCDF%5D=115-125&nutrients%5BENERC_KCAL%5D=918-1018&nutrients%5BFAT%5D=16-26&nutrients%5BPROCNT%5D=67-77
    //https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&nutrients%5BFAT%5D=${breakfastFatRange}&nutrients%5BPROCNT%5D=${breakfastProteinRange}
    //getting the request url with excluded foods or not, vegan or not
    let breakfastsRequestUrl;
    
    if (objectWithMacros.dietType === 'normal') {
        if (objectWithMacros.allergies.length > 0) {
            breakfastsRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&${excludedIngredients}&random=true`;
        } else {
            breakfastsRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&random=true`;
        };
    } else {
        if (objectWithMacros.allergies.length > 0) {
            breakfastsRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&${excludedIngredients}&health=${objectWithMacros.dietType}&random=true`;
        } else {
            breakfastsRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Breakfast&nutrients%5BCHOCDF%5D=${breakfastCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${breakfastCalorieRange}&health=${objectWithMacros.dietType}&random=true`;
        };
    };

    //getting the lunches ranges
    const lunchCalorieRange = `${lunchMacros.calories - 100}-${lunchMacros.calories + 100}`;
    const lunchCarbohydrateRange = `${lunchMacros.carbohydrates - 5}-${lunchMacros.carbohydrates + 5}`;
    const lunchFatRange = `${lunchMacros.fat - 5}-${lunchMacros.fat + 5}`
    const lunchProteinRange = `${lunchMacros.protein - 5}-${lunchMacros.protein + 5}`

    //getting the request with excluded foods or not, vegan or not
    let lunchRequestUrl;
    
    if (objectWithMacros.dietType === 'normal') {
        if (objectWithMacros.allergies.length > 0) {
            lunchRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Lunch&nutrients%5BCHOCDF%5D=${lunchCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${lunchCalorieRange}&${excludedIngredients}&random=true`;   
        } else {
            lunchRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Lunch&nutrients%5BCHOCDF%5D=${lunchCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${lunchCalorieRange}&random=true`;       
        }; 
    } else {
        if (objectWithMacros.allergies.length > 0) {
            lunchRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Lunch&nutrients%5BCHOCDF%5D=${lunchCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${lunchCalorieRange}&${excludedIngredients}&health=${objectWithMacros.dietType}&random=true`;
        } else {
            lunchRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Lunch&nutrients%5BCHOCDF%5D=${lunchCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${lunchCalorieRange}&health=${objectWithMacros.dietType}&random=true`;
        };
    };

    //getting the dinners ranges
    const dinnerCalorieRange = `${dinnerMacros.calories - 100}-${dinnerMacros.calories + 100}`;
    const dinnerCarbohydrateRange = `${dinnerMacros.carbohydrates - 5}-${dinnerMacros.carbohydrates + 5}`;
    const dinnerFatRange = `${dinnerMacros.fat - 5}-${dinnerMacros.fat + 5}`
    const dinnerProteinRange = `${lunchMacros.protein - 5}-${lunchMacros.protein + 5}`

    //getting the request url with excluded foods or not, vegan or not
    let dinnerRequestUrl;
    
    if (objectWithMacros.dietType === 'normal') {
        if (objectWithMacros.allergies.length > 0) {
            dinnerRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Dinner&nutrients%5BCHOCDF%5D=${dinnerCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${dinnerCalorieRange}&${excludedIngredients}&random=true`;
        } else {
           dinnerRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Dinner&nutrients%5BCHOCDF%5D=${dinnerCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${dinnerCalorieRange}&random=true`;
        };
    } else {
        if (objectWithMacros.allergies.length > 0) {
            dinnerRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Dinner&nutrients%5BCHOCDF%5D=${dinnerCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${dinnerCalorieRange}&${excludedIngredients}&health=${objectWithMacros.dietType}&random=true`;
        } else {
            dinnerRequestUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=cccf4bab&app_key=%200697729895b68a38aee3a528944a33b2%09&mealType=Dinner&nutrients%5BCHOCDF%5D=${dinnerCarbohydrateRange}&nutrients%5BENERC_KCAL%5D=${dinnerCalorieRange}&health=${objectWithMacros.dietType}&random=true`;
        };
    };
    
    //making a one big request
    async function fetchDataByUrl(url) {
        try {
            const res = await fetch(url);
            const data = res.json();
            return data;
        } catch(err) {
            return err;
        };
    };

    let meals = await Promise.all([
        fetchDataByUrl(breakfastsRequestUrl),
        fetchDataByUrl(lunchRequestUrl),
        fetchDataByUrl(dinnerRequestUrl)
    ]);
    meals = meals.map((meal) => meal.hits);

    return meals;
};

export default getMealPlan;