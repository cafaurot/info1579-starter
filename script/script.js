//TODO: Include your multi-line comment header
/*
    Name: Chance Faurot
    Date: 9/27/2026
    Assignment: Module 02 Applied Programming Activity
    Quarter: Fall 2026
    Instructor: Tania Kuisma
*/

"use strict";

// DO NOT MODIFY
// const display = (label, value) =>
//  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY

// ADD YOUR CODE BELOW
import { courseModules } from "./data.js";

import {
  calculatePercentComplete,
  getCourseGrade,
  getCourseProgress,
  getStudyPlan,
} from "./calculations.js";

import {
  validateInputs,
  runUnitTests,
} from "./validators.js";

import {
  resetDashboard,
  displayRemainingModules,
  applyDashboardColor,
  displayDashboard,
} from "./dashboard.js";

import {
  displayJoke,
  displayQuote,
} from "./api.js";

const studentNameInput = document.getElementById("studentName");
const completedModulesInput = document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const output = document.getElementById("output");

displayJoke();
displayQuote();


const generateDashboard = () => {
  const output = document.getElementById("output");

  try {
    const studentName = studentNameInput.value;
    console.log("Student Name:", studentName);
    const completedModules = Number(completedModulesInput.value);
    console.log("Completed Modules:", completedModules);
    const studyDay = studyDayInput.value;
    console.log("Study Day:", studyDay);

    if (!Number.isInteger(completedModules) || completedModules < 0 || completedModules > courseModules.length) {
      output.textContent = `Enter a completed-module count from 0 to ${courseModules.length}.`;
      return;
    }

    validateInputs(studentName, completedModules, studyDay, courseModules);

    const moduleNames = courseModules.map((module) => module.moduleName);
    console.log("Modules:", moduleNames);

    const remainingModules = courseModules.filter((module, index) => index >= completedModules);
    const remainingHours = remainingModules.reduce((total, module) => total + module.hoursRequired, 0);

    const totalStudyHours = courseModules.reduce((total, module) => total + module.hoursRequired, 0);
    const percentComplete = calculatePercentComplete(completedModules, courseModules.length);
    console.log("Percent Complete:", percentComplete);
    const percentRemaining = 100 - percentComplete;
    const dailyStudyHours = 6 / 7;
    const dailyStudyMinutes = dailyStudyHours * 60;

    const grade = getCourseGrade(percentComplete);
    console.log("Grade:", grade);
    const progress = getCourseProgress(percentRemaining);
    console.log("Progress Status:", progress);
    const studyPlan = getStudyPlan(studyDay, dailyStudyMinutes);

    displayDashboard(
      studentName,
      courseModules.length,
      completedModules,
      totalStudyHours,
      remainingHours,
      percentComplete,
      percentRemaining,
      grade,
      progress,
      studyDay,
      studyPlan,
      output
    );

    displayRemainingModules(remainingModules);
    applyDashboardColor(percentComplete, output);
    runUnitTests();
  } catch (error) {
    output.innerHTML = `
      <div class="dashboard-card">
        <h2>Error</h2>
        <ul>${error.message}</ul>
      </div>
    `;
    output.style.backgroundColor = "#f8d7da";
  }
};

generateButton.addEventListener("click", generateDashboard);
resetButton.addEventListener("click", () =>resetDashboard(studentNameInput,completedModulesInput,studyDayInput,output));
