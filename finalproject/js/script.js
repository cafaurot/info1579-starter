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
import { courseModules } from "../../script/data.js";
import { careerPaths } from "./data.js";

import {
  calculatePercentComplete,
  getCourseGrade,
  getCourseProgress,
  getStudyPlan,
} from "../../script/calculations.js";

import { validateInputs, runUnitTests } from "../../script/validators.js";
import { displayQuote } from "../../script/api.js";
import {
  applyDashboardColor,
  displayDashboard,
  displayRemainingModules,
} from "../../script/dashboard.js";

const studentNameInput = document.getElementById("studentName");
const completedModulesInput = document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const userForm = document.getElementById("userForm");
const output = document.getElementById("output");
const careerSelect = document.getElementById("career");

displayQuote();

const careerNames = careerPaths.map((career) => career.name);
console.log("Career path names:", careerNames);

const careerPathsWithMoreThanFourResources = careerPaths.filter(
  (career) => career.resources.length > 4,
);
console.log(
  "Career paths with more than four resources:",
  careerPathsWithMoreThanFourResources,
);

const totalCareerSkills = careerPaths.reduce(
  (total, career) => total + career.skills.length,
  0,
);
console.log("Total career skills:", totalCareerSkills);

const displayCareerPath = (career) => {
  const section = document.createElement("section");
  section.className = "dashboard-card";

  const heading = document.createElement("h3");
  heading.textContent = `Career Path: ${career.name}`;
  section.appendChild(heading);

  const skillsHeading = document.createElement("h4");
  skillsHeading.textContent = "Skills to develop";
  section.appendChild(skillsHeading);

  const skillsList = document.createElement("ul");
  career.skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    skillsList.appendChild(item);
  });
  section.appendChild(skillsList);

  const resourcesHeading = document.createElement("h4");
  resourcesHeading.textContent = "Learning resources";
  section.appendChild(resourcesHeading);

  const resourcesList = document.createElement("ul");
  career.resources.forEach((resource) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = resource;
    link.textContent = new URL(resource).hostname;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    item.appendChild(link);
    resourcesList.appendChild(item);
  });
  section.appendChild(resourcesList);
  output.appendChild(section);
};

const generateDashboard = () => {
  try {
    const studentName = studentNameInput.value;
    const selectedCareer = careerPaths.find(
      (career) => career.name === careerSelect.value,
    );
    if (!selectedCareer) {
      throw new Error("Please select a career path.");
    }

    if (completedModulesInput.value.trim() === "") {
      throw new Error("Please enter a completed-module count.");
    }
    const completedModules = Number(completedModulesInput.value);
    const studyDay = studyDayInput.value;

    if (
      !Number.isInteger(completedModules) ||
      completedModules < 0 ||
      completedModules > courseModules.length
    ) {
      throw new Error(
        `Completed modules must be a whole number between 0 and ${courseModules.length}.`,
      );
    }

    validateInputs(studentName, completedModules, studyDay, courseModules);

    const remainingModules = courseModules.filter(
      (module, index) => index >= completedModules,
    );
    const remainingHours = remainingModules.reduce(
      (total, module) => total + module.hoursRequired,
      0,
    );

    const totalStudyHours = courseModules.reduce(
      (total, module) => total + module.hoursRequired,
      0,
    );
    const percentComplete = calculatePercentComplete(
      completedModules,
      courseModules.length,
    );
    const percentRemaining = 100 - percentComplete;
    const dailyStudyHours = 6 / 7;
    const dailyStudyMinutes = dailyStudyHours * 60;

    const grade = getCourseGrade(percentComplete);
    const progress = getCourseProgress(percentRemaining);
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
      output,
    );

    displayRemainingModules(remainingModules);
    displayCareerPath(selectedCareer);
    applyDashboardColor(percentComplete, output);
    runUnitTests();
  } catch (error) {
    output.textContent =
      error instanceof Error
        ? error.message.replace(/<\/?li>/g, " ").trim()
        : "Unable to generate the dashboard.";
    output.style.backgroundColor = "#f8d7da";
  }
};

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  generateDashboard();
});

userForm.addEventListener("reset", () => {
  output.replaceChildren();
  output.style.backgroundColor = "";
});
