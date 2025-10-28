import { quiz_Ghibli } from "./question.js";

const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.querySelector(".question");
const quizOption = document.querySelector(".options");
const nextButton = document.getElementById("next-button");

console.log(quizContainer, quizQuestion, quizOption, nextButton);

const firstQuestion = quiz_Ghibli.questions[0];

quizQuestion.innerText = firstQuestion.text;

console.log(firstQuestion);

firstQuestion.options.forEach((option) => {
  const option_btn = document.createElement("button");
  option_btn.innerText = option;
  option_btn.classList.add("options");
  quizOption.appendChild(option_btn);
});

console.log(quizOption);
