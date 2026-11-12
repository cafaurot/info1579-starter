import {
  getCourseGrade,
  getCourseProgress,
  getStudyPlan,
} from "./calculations.js";
export const validateInputs = (studentName, completedModules, studyDay, courseModules) => {
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

export const runUnitTests = () => {
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
    getStudyPlan('Wednesday', 45) === 'Study for 45.00 minutes today.',
    "Study Plan Wednesday test failed"
  );
  console.assert(
    getStudyPlan('Thursday', 45) === 'Lab day! Work for 45.00 minutes today.',
    "Study Plan Thursday test failed"
  );
  console.assert(
    getStudyPlan('Friday', 0) === 'Coaching day.' &&
      getStudyPlan('Saturday', 45) ===
        'Applied programming activity day. Work for 45.00 minutes today.' &&
      getStudyPlan('Sunday', 0) === 'Game day.',
    "Study Plan weekend and Friday tests failed"
  );
  console.assert(
    getStudyPlan('Complete', 0) === 'Course Completed!' &&
      getStudyPlan('Invalid', 0) === 'Invalid Day',
    "Study Plan completion and invalid day tests failed"
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