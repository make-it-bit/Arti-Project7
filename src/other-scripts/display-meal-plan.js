import generateHtmlForOneDay from "./html-generators/meals-for-day-generator";

//function for generating the HTML elements that display the info of the meals for the day
const generateHtmlForMeals = (objectWithArrays) => {
    //add handling in case there are no meals to display
    const mealplanResultsSection = document.querySelector('#meal_plan_results');

    let i = 0;
    while (i < 7) {
        //checking if we have any values to display
        if ( typeof objectWithArrays[0][i] === 'undefined' || typeof objectWithArrays[1][i] === 'undefined' || typeof objectWithArrays[2][i] === 'undefined') {
            if (i === 0) {
                const errorDiv = document.createElement('div');

                const errorHeader = document.createElement('h2');
                errorHeader.innerText = "We don't have any meals to display."
                errorDiv.appendChild(errorHeader);

                const errorParagraph = document.createElement('p');
                errorParagraph.innerText = "Something wen't wrong, this could be because You entered some specifications we can't create a diet plan from, or an error occured. Please consider trying again.";
                errorDiv.appendChild(errorParagraph);

                mealplanResultsSection.appendChild(errorDiv);
                break;
            } else {
                const errorDiv = document.createElement('div');

                const errorHeader = document.createElement('h2');
                errorHeader.innerText = "We don't have any more meals to display."
                errorDiv.appendChild(errorHeader);

                const errorParagraph = document.createElement('p');
                errorParagraph.innerText = "We could only create this meal plan so far based off Your specifications. Different specifications could get You and better result.";
                errorDiv.appendChild(errorParagraph);

                mealplanResultsSection.appendChild(errorDiv);
                break;
            };
        };
        const dataToDisplay = generateHtmlForOneDay((i + 1), objectWithArrays[0][i], objectWithArrays[1][i], objectWithArrays[2][i], objectWithArrays[3]);
        mealplanResultsSection.appendChild(dataToDisplay);
        i++
    }
};

generateHtmlForMeals(JSON.parse(localStorage.getItem("meals")));