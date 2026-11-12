export function calculatePercentComplete(completed,total){
  return (completed  / total) * 100;
}

export function calculateStudyHours(modules,hoursPerModule = 6){
  return modules * hoursPerModule;
}

export function getCourseGrade(percentComplete){
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

export function getCourseProgress(percentRemaining){
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

export function getStudyPlan(studyDay, dailyStudyMinutes){
  switch(studyDay){
    case 'Monday':
      return 'Rest day.';
    case 'Tuesday':
      return 'Other Class day.';
    case 'Wednesday':
      return `Study for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
    case 'Thursday':
      return `Lab day! Work for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
    case 'Friday':
      return 'Coaching day.';
    case 'Saturday':
      return `Applied programming activity day. Work for ${dailyStudyMinutes.toFixed(2)} minutes today.`;
    case 'Sunday':
      return 'Game day.';
    case 'Complete':
      return 'Course Completed!';
    default:
      return 'Invalid Day';
  }
}