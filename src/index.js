import getMeal from "./other-scripts/generate-meal.js";
import nutritionIcon from './assets/nutrition_icon.svg';
import './styles/main-index.scss';

document.querySelector('#calory_icon').src = nutritionIcon;

console.log(getMeal());
