class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurnt();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }

  // Public Methods/API

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("calories-total");

    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById("calories-limit");

    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumed = document.getElementById("calories-consumed");

    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0,
    );

    caloriesConsumed.innerHTML = consumed;
  }

  _displayCaloriesBurnt() {
    const caloriesBurned = document.getElementById("calories-burned");

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0,
    );

    caloriesBurned.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemaining = document.getElementById("calories-remaining");
    const progressEl = document.getElementById("calorie-progress");

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemaining.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-light",
      );
      caloriesRemaining.parentElement.parentElement.classList.add("bg-danger");
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemaining.parentElement.parentElement.classList.remove(
        "bg-danger",
      );
      caloriesRemaining.parentElement.parentElement.classList.add("bg-light");
      progressEl.classList.remove("bg-danger");
      progressEl.classList.add("bg-success");
    }
  }

  _displayCalorieProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurnt();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal("Breakfast", 2);
const lunch = new Meal("lunch", 350);

tracker.addMeal(breakfast);
const run = new Workout("run", 300);

tracker.addMeal(lunch);

tracker.addWorkout(run);
