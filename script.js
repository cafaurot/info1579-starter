//TODO: Include your multi-line comment header
/*
    Name: Chance Faurot
    Date: 9/14/2026
    Assignment: Module 01 Applied Programming Activity
    Quarter: Fall 2026
    Instructor: Tania Kuisma
*/

// TODO: Import "use strict" directive
"use strict";

// DO NOT MODIFY
const display = (label, value) =>
  (document.getElementById("output").innerHTML += `${label}: ${value}<br>`);
// END DO NOT MODIFY

// ADD YOUR CODE BELOW

// TODO: Create variables for your name (string), total number of modules for our class (number), and if you're enrolled (boolean)
const name = 'Chance Faurot';
const totalModules = 10;
const isEnrolled = true;

// TODO: Use a template literal to output a welcome message. Use at least one ${}.
const welcomeMessage = `Welcome, ${name}!`;

// TODO: Calculate the total study hours for the course. There are 10 modules. Each module takes roughly 6 hours.
// Formula: totalStudyHours = totalModules * hoursPerWeek
const totalStudyHours = totalModules * 6;

// TODO: Calculate the number of study hours each day. Convert the output to minutes (this formula is not provided).
// Formula: dailyStudyHours = hoursPerWeek / 7
const dailyStudyHours = totalStudyHours / 7;
const dailyStudyMinutes = dailyStudyHours * 60;

// TODO: Give yourself a rest day and exclude one day out of your week. Calculate the new number of hours and set it to adjustedDailyHours. Convert the output to minutes (this formula is not provided).
const adjustedDailyHours = totalStudyHours / 6;
const adjustedDailyMinutes = adjustedDailyHours * 60;
// TODO: Calculate the course percent complete and the course percent remaining. Imagine you've completed 2 modules (Start Here and Module 1).
// Formula: percent = (part / whole) * 100
const percentComplete = (2 / totalModules) * 100;
const percentRemaining = 100 - percentComplete;
// DISPLAY RESULTS

// TODO: Display your results. Use the correct variables and avoid hard-coding the data below.
// TODO: Adjust all decimals to two places.
display("Greeting Message", welcomeMessage);
display("Enrolled",isEnrolled);
display("Total Modules",totalModules);
display("Daily Study Hours (7 days)",dailyStudyHours.toFixed(2));
display("Daily Study Minutes (7 days)",dailyStudyMinutes.toFixed(2));
display("Daily Study Hours (with rest day)",adjustedDailyHours.toFixed(2));
display("Daily Study Minutes (with rest day)",adjustedDailyMinutes.toFixed(2));

// TODO: Display your results with a % sign
display("Percent Complete",percentComplete.toFixed(2)+'%');
display("Percent Remaining",percentRemaining.toFixed(2)+'%');
