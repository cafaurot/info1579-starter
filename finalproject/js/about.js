import { displayJoke } from "../../script/api.js";

const aboutMeObject = {
  name: "Chance Faurot",
  major: "idk, haven't decided yet",
  currentJob: "Student",
  hobbies: ["Producing Music", "Gaming", "Reading"],
  skills: ["JavaScript", "PowerPoint", "HTML"],
};

document.getElementById("name").innerHTML = aboutMeObject.name;
document.getElementById("major").innerHTML = aboutMeObject.major;
document.getElementById("currentJob").innerHTML = aboutMeObject.currentJob;

document.getElementById("hobbies").innerHTML = aboutMeObject.hobbies
  .map((hobby) => `<li>${hobby}</li>`)
  .join("");

document.getElementById("skills").innerHTML = aboutMeObject.skills
  .map((skill) => `<li>${skill}</li>`)
  .join("");

displayJoke();
