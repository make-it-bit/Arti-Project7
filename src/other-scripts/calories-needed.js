const calculateCaloriesAndMacrosNeeded = ({
  userWeight: weight,
  userHeight: height,
  userAge: age,
  userGender: gender,
  userActivityLevel: activityLevel,
  userWeightGoal: weightGoal,
}) => {
  //calculating user's bmr
  let bmr;
  if (gender === 'male') {
    bmr = +(66 + 13.7 * weight + 5 * height - 6.8 * age);
  } else {
    bmr = +(655 + 9.6 * weight + 1.8 * height - 4.7 * age);
  }

  //calculating how much calories the user burns
  let actualCaloriesBurnedDaily;
  switch (activityLevel) {
    case 'sedentary': {
      actualCaloriesBurnedDaily = bmr * 1.2;
      break;
    }
    case 'lightly_active': {
      actualCaloriesBurnedDaily = bmr * 1.375;
      break;
    }
    case 'active': {
      actualCaloriesBurnedDaily = bmr * 1.55;
      break;
    }
    case 'very_active': {
      actualCaloriesBurnedDaily = bmr * 1.725;
      break;
    }
    case 'extremely_active': {
      actualCaloriesBurnedDaily = bmr * 1.9;
      break;
    }
    default: {
      actualCaloriesBurnedDaily = bmr * 1.3;
    }
  }

  //calculating how much calories the user needs for his/her needs
  let caloriesNeeded;
  switch (weightGoal) {
    case 'lose_weight': {
      caloriesNeeded = actualCaloriesBurnedDaily * 0.9;
      break;
    }
    case 'gain_weight': {
      caloriesNeeded = actualCaloriesBurnedDaily * 1.1;
      break;
    }
    default: {
      caloriesNeeded = actualCaloriesBurnedDaily;
    }
  }
  caloriesNeeded = Math.floor(caloriesNeeded);

  //calculating macros
  const carbohydrates = Math.floor((caloriesNeeded * 0.5) / 4);
  const protein = Math.floor((caloriesNeeded * 0.3) / 4);
  const fat = Math.floor((caloriesNeeded * 0.2) / 9);

  return {
    caloriesNeeded,
    carbohydrates,
    protein,
    fat,
  };
};

export default calculateCaloriesAndMacrosNeeded;
