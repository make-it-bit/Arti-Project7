import nutritionIcon from './assets/nutrition_icon.svg';
import './styles/main-index.scss';

document.querySelector('#calory_icon').src = nutritionIcon;

//displaying the form as neccesseary
const calculateYourMacrosButton = document.querySelector('#calculate_your_macros');
const enterYourMacrosButton = document.querySelector('#enter_your_macros');

const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');

//defualt case of form displaying, when loading the site
form2.style.display = 'none';

document.querySelector('.form_selector').addEventListener('click', () => {
    if (enterYourMacrosButton.checked) {
        form1.style.display = 'none';
        form2.style.display = 'block';
    } else if (calculateYourMacrosButton.checked) {
        form2.style.display = 'none';
        form1.style.display = 'block';
    };
});

