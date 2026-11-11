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

const courseModules = ['Module 1','Module 2','Module 3','Module 4','Module 5','Module 6','Module 7','Module 8','Module 9','Module 10',];
// const completedModules = ['Module 1','Module 2','Module 3'];
const name = 'Chance Faurot';
const totalModules = 10;
const isEnrolled = true;

const welcomeMessage = `Welcome, ${name}!`;

const adjustedDailyHours = 6 / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;

const studentNameInput = document.getElementById("studentName");
const completedModulesInput = document.getElementById("completedModules");
const studyDayInput = document.getElementById("studyDay");
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const jokeContainer = document.getElementById("jokeContainer");
const quoteContainer = document.getElementById("quoteContainer");
const output = document.getElementById("output");

function calculatePercentComplete(completed,total){
  return (completed  / total) * 100;
}

function calculateStudyHours(modules,hoursPerModule = 6){
  return modules * hoursPerModule;
}

const getJoke = async () => {
    const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve joke.");
    }

    const data = await response.json();

    return data;
};

const displayJoke = async () => {
    try {
        jokeContainer.innerHTML = "Loading joke...";

        const joke = await getJoke();

        jokeContainer.innerHTML = `
            <p>${joke.setup}</p>
            <p>${joke.punchline}</p>
        `;
    } catch (error) {
        jokeContainer.innerHTML = "Unable to load joke.";
    }
};

displayJoke();

const getQuote = async () => {
    const response = await fetch(
        "https://dummyjson.com/quotes/random"
    );

    if (!response.ok) {
        throw new Error("Unable to retrieve quote.");
    }

    const data = await response.json();

    return data;
};

const displayQuote = async () => {
    try {
        quoteContainer.innerHTML = "Loading quote...";

        const quote = await getQuote();

        quoteContainer.innerHTML = `
            <p>${quote.quote}</p>
            <p>${quote.author}</p>
        `;
    } catch (error) {
        quoteContainer.innerHTML = "Unable to load quote.";
    }
};

displayQuote();

function getCourseProgress(percentRemaining){
  if(percentRemaining === 0){
  return 'Current Progress: Finished!';
} else if(percentRemaining <= 24.99) {
  return 'Current Progress: Almost Finished';
} else if(percentRemaining >= 25 && percentRemaining <= 74.99) {
 return 'Current Progress: Making Progress';
} else if(percentRemaining >= 75) {
  return 'Current Progress: Just Getting Started';
} else {
  return 'Invalid entry';
}
}

function getCourseGrade(percentComplete){
  if(percentComplete >= 90){
  return 'A';
} else if(percentComplete >= 80) {
  return 'B';
} else if(percentComplete >= 70) {
  return 'C';
} else if(percentComplete >= 60) {
  return 'D';
} else if(percentComplete < 60) {
  return 'F';
} else {
  return 'Invalid entry';
}
}

const displayModules = (modules) => {
  const list = document.createElement("ul");
  for (let i = 0; i < modules.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = modules[i];
    list.appendChild(listItem);
  }
  return list;
};

const displayRemainingModules = (completedModules) => {
  const remainingModules = courseModules.slice(completedModules);
  const remainingListContainer = document.getElementById("remainingModulesList");
  remainingListContainer.replaceChildren(displayModules(remainingModules));
};

const validateInputs = (studentName, completedModules, studyDay) => {
    const errors = [];
    if (studentName.trim() === "") {
      errors.push("<li>Please enter a name.</li>");
    }

    if (completedModules < 0 || completedModules > 10) {
      errors.push("<li>Completed modules must be between 0 and 10.</li>");
    }

    if (studyDay === ""){
      errors.push("<li>Please select a study day.</li>");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(""));
    }
};

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

    validateInputs(studentName, completedModules, studyDay);

    const totalStudyHours = calculateStudyHours(courseModules.length);
    const percentComplete = calculatePercentComplete(completedModules,courseModules.length);
    console.log("Percent Complete:", percentComplete);
    const percentRemaining = 100 - percentComplete;
    const dailyStudyHours =  6 / 7;
    const dailyStudyMinutes = dailyStudyHours * 60;

    const grade = getCourseGrade(percentComplete);
    console.log("Grade:", grade);
    const progress = getCourseProgress(percentRemaining);
    console.log("Progress Status:", progress);
    const studyPlan = getStudyPlan(studyDay, dailyStudyMinutes);

    displayDashboard(studentName, courseModules.length, completedModules, totalStudyHours, percentComplete, percentRemaining, grade, progress, studyDay, studyPlan);

    displayRemainingModules(completedModules);
    applyDashboardColor(percentComplete);
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

const applyDashboardColor = (percentComplete) => {
  if (percentComplete >= 75) {
    output.style.backgroundColor = "#d4edda";
  } else if (percentComplete >= 25) {
    output.style.backgroundColor = "#fff3cd";
  } else { 
    output.style.backgroundColor = "#f8d7da";
  }
};

const displayDashboard = (studentName, courseModulesLength, completedModules, totalStudyHours, percentComplete, percentRemaining, grade, progress, studyDay, studyPlan) => {
  output.innerHTML = `
        <div class="dashboard-card">

            <h2>My Study Dashboard</h2>

            <p><strong>Name:</strong> <span id="dashboardStudentName"></span></p>

            <p><strong>Total Modules:</strong> ${courseModulesLength}</p>

            <p><strong>Completed Modules:</strong> ${completedModules}</p>

            <p><strong>Total Study Hours:</strong> ${totalStudyHours}</p>

            <p><strong>Percent Complete:</strong>${percentComplete.toFixed(0)}%</p>

            <p><strong>Percent Remaining:</strong>${percentRemaining.toFixed(0)}%</p>

            <p><strong>Current Grade:</strong> ${grade}</p>

            <p><strong>Progress Status:</strong>${progress}</p>

            <p><strong>Study Day:</strong>${studyDay}</p>

            <p><strong>Today's Plan:</strong>${studyPlan}</p>

            <p><strong>Remaining Modules</strong><div id="remainingModulesList"></div></p>

        </div>`;
  output.querySelector("#dashboardStudentName").textContent = studentName;
};

/* const displayCompletedModules = (...modules) => {
  return modules.join(", ");
}
*/


// const completedModulesList = displayCompletedModules(...completedModules);


const getStudyPlan = (studyDay, dailyStudyMinutes) => {
  let studyPlan;
  switch (studyDay){
    case 'Monday':
      studyPlan = 'Rest day.';
      break;
    case 'Tuesday':
      studyPlan = 'Other Class day.';
      break;
    case 'Wednesday':
      studyPlan = 'Study for ' + dailyStudyMinutes.toFixed(2) + ' minutes today.';
      break;
    case 'Thursday':
      studyPlan = 'Lab day! Work for ' + dailyStudyMinutes.toFixed(2) + ' minutes today.';
      break;
    case 'Friday':
      studyPlan = 'Coaching day.';
      break;
    case 'Saturday':
      studyPlan = 'Applied programming activity day. Work for ' + dailyStudyMinutes.toFixed(2) + ' minutes today.';
      break;
    case 'Sunday':
      studyPlan = 'Game day.';
      break;
    case 'Complete':
      studyPlan = 'Course Completed!';
      break;
    default:
      studyPlan = 'Invalid Day';
      break;
  }
 return studyPlan;
}

// DISPLAY RESULTS

/* display("My Name", name);
display("Greeting Message", welcomeMessage);
display("Enrolled",isEnrolled);
display("Total Modules",displayModules(courseModules));
display("Completed Modules",completedModulesList);
display("Daily Study Hours (7 days)",dailyStudyHours.toFixed(2));
display("Daily Study Minutes (7 days)",dailyStudyMinutes.toFixed(2));
display("Daily Study Hours (with rest day)",adjustedDailyHours.toFixed(2));
display("Daily Study Minutes (with rest day)",adjustedDailyMinutes.toFixed(2));

// TODO: Display your results with a % sign
display("Percent Complete",percentComplete.toFixed(2)+'%');
display("Percent Remaining",percentRemaining.toFixed(2)+'%');
display("Course Progress",getCourseProgress(percentRemaining));
display('Course Grade', getCourseGrade(percentComplete));
display("Study Plan",getStudyPlan(studyDay));
*/

const resetDashboard = () => {
  console.log("studentNameInput value:", studentNameInput.value);
  studentNameInput.value = "";
  console.log("studyDayInput value:", studyDayInput.value);
  studyDayInput.value = "";
  console.log("completedModulesInput value:", completedModulesInput.value);
  completedModulesInput.value = 0;
  output.innerHTML = "";
  output.style.backgroundColor = "";
};

generateButton.addEventListener("click", generateDashboard);
resetButton.addEventListener("click", resetDashboard);

const runUnitTests = () => {
    console.assert(
    getCourseGrade(95) === "A",
    "Grade A test failed"
  );
  console.assert(
    getCourseGrade(85) === "B",
    "Grade B test failed"
  );
  console.assert(
    getCourseGrade(75) === "C",
    "Grade C test failed"
  );
  console.assert(
    getCourseGrade(65) === "D",
    "Grade D test failed"
  );
  console.assert(
    getCourseGrade(55) === "F",
    "Grade F test failed"
  );
   console.assert(
    getStudyPlan('Monday', 0) === 'Rest day.',
    "Study Plan Monday test failed"
  );
  console.assert(
    getStudyPlan('Tuesday', 0) === 'Other Class day.',
    "Study Plan Tuesday test failed"
  );
  console.assert(
    getCourseProgress(50) === 'Current Progress: Making Progress',
    "Course Progress test failed"
  );
  console.assert(
    getCourseProgress(0) === 'Current Progress: Finished!',
    "Course Progress test failed"
  );
  console.assert(
    getCourseProgress(100) === 'Current Progress: Just Getting Started',
    "Course Progress test failed"
  );
};