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
const display = (label, value) =>
  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY

// ADD YOUR CODE BELOW

const courseModules = ['Module 1','Module 2','Module 3','Module 4','Module 5','Module 6','Module 7','Module 8','Module 9','Module 10',];
const completedModules = ['Module 1','Module 2','Module 3'];
const name = 'Chance Faurot';
const totalModules = 10;
const isEnrolled = true;

const welcomeMessage = `Welcome, ${name}!`;

const totalStudyHours = calculateStudyHours(courseModules.length);

const dailyStudyHours =  6 / 7;
const dailyStudyMinutes = dailyStudyHours * 60;


const adjustedDailyHours = 6 / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;

function calculatePercentComplete(completed,total){
  return (completed  / total) * 100;
}

function calculateStudyHours(modules,hoursPerModule = 6){
  return modules * `${hoursPerModule}`;
}

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
  for (let i = 0; i < modules.length; i++) {
    display(`Module ${i + 1}`, modules[i]);
  }
}

const displayCompletedModules = (...modules) => {
  return modules.join(", ");
}



const completedModulesList = displayCompletedModules(...completedModules);

const percentComplete = calculatePercentComplete(completedModules.length,courseModules.length);
const percentRemaining = 100 - percentComplete;

let studyDay;
if (percentComplete === 100) {
  studyDay = 'Complete';
} else {
  studyDay = prompt('Input a day of the week (Monday): ');
}
const getStudyPlan = (studyDay) => {
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

display("My Name", name);
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
