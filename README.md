# Tracalorie

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap" />
  <img src="https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/LocalStorage-000000?style=for-the-badge&logo=googlechrome&logoColor=white" alt="LocalStorage" />
</p>

Tracalorie is a lightweight calorie tracking dashboard built with vanilla JavaScript and Bootstrap. It helps users monitor their daily calorie intake, log meals and workouts, track hydration, and save a quick personal note about how they feel throughout the day.

The app is designed for everyday use and stores its data locally in the browser so that progress remains available across refreshes without requiring a backend service.

## Overview

This project gives users a clear view of their daily wellness numbers in one place. It combines activity entries, calorie totals, and hydration tracking into a single, clean dashboard that is easy to review at a glance.

The application is intentionally simple and focused on usability. Instead of requiring a server or database, it uses browser local storage to save important values such as:

- daily calorie limit
- meals entered by the user
- workouts logged by the user
- hydration progress
- journal mood and note

## Features

### Daily calorie dashboard

The home dashboard displays the key numbers that matter most for tracking progress:

- daily calorie limit
- total net calories gained or lost
- calories consumed
- calories burned
- calories remaining
- progress bar showing how close the user is to the daily limit

This makes it easy to understand whether the current day is in a surplus or deficit.

### Meal tracking

Users can add meal items with the following information:

- meal name
- calories value

Each meal appears as a card in the meals section and can be:

- edited
- deleted
- filtered by search text

Meal entries are highlighted in the same color style used throughout the dashboard for quick visual recognition.

### Workout tracking

Users can log workout activity in a separate section that includes:

- workout name
- calories burned

Workout entries support the same actions as meals:

- edit
- delete
- filter

These values are then subtracted from the total calorie count to calculate net progress for the day.

### Calorie limit controls

A daily calorie target can be set from a modal form. The limit updates the tracker instantly and adjusts the remaining calories and progress bar based on current totals.

This gives the user flexibility to adapt the app to their personal nutrition goals without reloading or restarting the app.

### Water intake tracking

The app includes a dedicated hydration panel that tracks daily water consumption.

Users can add water in preset amounts, such as:

- 250 ml
- 500 ml

The app displays:

- current water amount
- total hydration goal
- progress bar for water intake

The hydration feature makes the tracker more complete by covering an important wellness metric in addition to calories.

### Daily journal

The site includes a mood and note section where the user can record:

- energy level
- short daily note

This journal data is stored in the browser and loads automatically when the page is reopened, making it useful for reflecting on habits over time.

### Filtering and search

Both meal and workout lists can be filtered in real time using text inputs. This helps users quickly find an entry without manually scrolling through the full list.

A clear filters action resets the search fields instantly.

### Reset day functionality

The app includes a reset option that clears the day’s calorie activity, water, and journal entries after confirmation. This is useful for starting fresh on a new day or undoing a full tracking session.

### Data export

Users can export the current day’s data as a JSON file. This includes:

- calorie limit
- meals
- workouts
- water intake
- journal data
- timestamp

This allows the user to save or share their tracked data outside the browser if needed.

### Local persistence

All the app data is saved with browser localStorage. That means:

- entries stay available after refresh
- the current tracking state persists during typical browser use
- no backend setup is required

## Tech Stack

This project uses a simple front-end stack based on static web technologies:

- HTML5 for structure and layout
- CSS3 for styling and responsive presentation
- JavaScript for application logic and interactivity
- Bootstrap for components, layout, and styling
- Font Awesome for icons
- LocalStorage for persistent browser data

## Project Structure

```text
tracalorie/
├── index.html
├── css/
│   ├── bootstrap.css
│   ├── bootstrap-grid.css
│   ├── bootstrap-reboot.css
│   ├── bootstrap-utilities.css
│   ├── fontawesome.css
│   └── style.css
├── js/
│   ├── app.js
│   └── bootstrap.bundle.min.js
├── scss/
│   └── ...
├── webfonts/
├── favicon.ico
└── README.md
```

## Getting Started

### Prerequisites

No framework installation or package manager setup is required.

You only need:

- a modern web browser
- a local web server or direct file access

### Run the project

You can launch the project in either of these ways:

1. Open index.html directly in the browser.
2. Serve the folder with a local static server, for example:

```bash
python -m http.server
```

Then open the local URL shown in the terminal, typically:

```text
http://localhost:8000
```

## Usage

1. Set your daily calorie limit.
2. Add a meal with its calories.
3. Add workouts that burn calories.
4. Track your hydration using the water buttons.
5. Save a quick mood or note in the journal section.
6. Use the filter boxes to find specific entries quickly.
7. Export your data when needed.
8. Reset the day whenever you want to begin fresh.

## Application Behavior

The app calculates total progress using the following principle:

- consumed calories from meals
- minus burned calories from workouts
- compared against the user-defined calorie target

The logic updates the UI immediately after each item is added, edited, removed, or reset. All major changes are reflected in the dashboard widgets and progress bars.

## Summary

Tracalorie is a focused, usable calorie tracking application designed for daily wellness monitoring. It combines tracking, filtering, journaling, hydration, and export features into a clean single-page interface while storing data locally for convenience and simplicity.
