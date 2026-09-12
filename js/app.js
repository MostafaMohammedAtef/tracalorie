class AppStorage {
  static keys = {
    calorieLimit: "tracalorie-calorie-limit",
    meals: "tracalorie-meals",
    workouts: "tracalorie-workouts",
  };

  static _read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  static getCalorieLimit() {
    const limit = Number(this._read(this.keys.calorieLimit, 2000));
    return limit > 0 ? limit : 2000;
  }

  static getMeals() {
    const meals = this._read(this.keys.meals, []);
    return Array.isArray(meals) ? meals : [];
  }

  static getWorkouts() {
    const workouts = this._read(this.keys.workouts, []);
    return Array.isArray(workouts) ? workouts : [];
  }

  static saveCalorieLimit(limit) {
    localStorage.setItem(this.keys.calorieLimit, JSON.stringify(limit));
  }

  static saveMeals(meals) {
    localStorage.setItem(this.keys.meals, JSON.stringify(meals));
  }

  static saveWorkouts(workouts) {
    localStorage.setItem(this.keys.workouts, JSON.stringify(workouts));
  }

  static clearItems() {
    localStorage.removeItem(this.keys.meals);
    localStorage.removeItem(this.keys.workouts);
  }

  static clearAll() {
    localStorage.removeItem(this.keys.calorieLimit);
    this.clearItems();
  }
}

class CalorieTracker {
  constructor() {
    this._calorieLimit = AppStorage.getCalorieLimit();
    this._meals = AppStorage.getMeals().map(
      (meal) => new Meal(meal.name, Number(meal.calories), meal.id),
    );
    this._workouts = AppStorage.getWorkouts().map(
      (workout) =>
        new Workout(workout.name, Number(workout.calories), workout.id),
    );
    this._totalCalories = this._calculateTotal();

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
    AppStorage.saveMeals(this._meals);
    this._totalCalories = this._calculateTotal();
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    AppStorage.saveWorkouts(this._workouts);
    this._totalCalories = this._calculateTotal();
    this._render();
  }

  removeMeal(id) {
    const meal = this._meals.find((item) => item.id === id);
    this._meals = this._meals.filter((item) => item.id !== id);
    if (meal) {
      AppStorage.saveMeals(this._meals);
      this._totalCalories = this._calculateTotal();
      this._render();
    }
  }

  removeWorkout(id) {
    const workout = this._workouts.find((item) => item.id === id);
    this._workouts = this._workouts.filter((item) => item.id !== id);
    if (workout) {
      AppStorage.saveWorkouts(this._workouts);
      this._totalCalories = this._calculateTotal();
      this._render();
    }
  }

  setCalorieLimit(limit) {
    this._calorieLimit = limit;
    AppStorage.saveCalorieLimit(limit);
    this._render();
  }

  clearItems() {
    this._meals = [];
    this._workouts = [];
    this._totalCalories = 0;
    AppStorage.clearItems();
    this._render();
  }

  _calculateTotal() {
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0,
    );
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0,
    );
    return consumed - burned;
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
    const width = Math.max(0, Math.min(percentage, 100));
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurnt();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }
}

class Meal {
  constructor(name, calories, id = Math.random().toString(16).slice(2)) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories, id = Math.random().toString(16).slice(2)) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));
    document
      .getElementById("filter-meals")
      .addEventListener("input", this._filterItems.bind(this));
    document
      .getElementById("filter-workouts")
      .addEventListener("input", this._filterItems.bind(this));
    document
      .getElementById("clear-filters")
      .addEventListener("click", this._clearFilters.bind(this));

    this._renderItems();
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    const item =
      type === "meal"
        ? new Meal(name.value, +calories.value)
        : new Workout(name.value, +calories.value);
    const listId = type === "meal" ? "meal-items" : "workout-items";
    const colorClass = type === "meal" ? "bg-primary" : "bg-secondary";

    if (type === "meal") {
      this._tracker.addMeal(item);
    } else {
      this._tracker.addWorkout(item);
    }

    this._appendItem(listId, item, colorClass);

    name.value = "";
    calories.value = "";

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById("limit");
    const value = Number(limit.value);

    if (!value || value <= 0) {
      alert("Please enter a calorie limit greater than zero");
      return;
    }

    this._tracker.setCalorieLimit(value);
    limit.value = "";

    const modal = document.getElementById("limit-modal");
    bootstrap.Modal.getInstance(modal)?.hide();
  }

  _appendItem(listId, item, colorClass) {
    const itemEl = document.createElement("div");
    itemEl.className = "card my-2 activity-entry";
    itemEl.dataset.itemId = item.id;
    itemEl.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1"></h4>
          <div class="fs-1 ${colorClass} text-white text-center rounded-2 px-2 px-sm-5">
            ${item.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2" type="button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>`;

    document.getElementById(listId).appendChild(itemEl);
    itemEl.querySelector("h4").textContent = item.name;
    itemEl
      .querySelector(".delete")
      .setAttribute("aria-label", `Delete ${item.name}`);
    itemEl.querySelector(".delete").addEventListener("click", () => {
      if (listId === "meal-items") {
        this._tracker.removeMeal(item.id);
      } else {
        this._tracker.removeWorkout(item.id);
      }
      itemEl.remove();
    });
  }

  _reset() {
    if (!confirm("Reset today's calories and activity?")) {
      return;
    }

    this._tracker.clearItems();
    this._renderItems();
  }

  _filterItems() {
    const mealQuery = document
      .getElementById("filter-meals")
      .value.toLowerCase();
    const workoutQuery = document
      .getElementById("filter-workouts")
      .value.toLowerCase();

    this._filterList("meal-items", mealQuery);
    this._filterList("workout-items", workoutQuery);
  }

  _filterList(listId, query) {
    document.querySelectorAll(`#${listId} .card`).forEach((item) => {
      item.classList.toggle(
        "is-filtered",
        !item.textContent.toLowerCase().includes(query),
      );
    });
  }

  _clearFilters() {
    document.getElementById("filter-meals").value = "";
    document.getElementById("filter-workouts").value = "";
    this._filterItems();
  }

  _renderItems() {
    const mealItems = document.getElementById("meal-items");
    const workoutItems = document.getElementById("workout-items");

    mealItems.innerHTML = "";
    workoutItems.innerHTML = "";

    this._tracker._meals.forEach((meal) => {
      this._appendItem("meal-items", meal, "bg-primary");
    });
    this._tracker._workouts.forEach((workout) => {
      this._appendItem("workout-items", workout, "bg-secondary");
    });
  }
}

const app = new App();
