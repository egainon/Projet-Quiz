import { quiz_Ghibli } from "./question.js";

const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.getElementsByClassName("question");
const quizOption = document.getElementsByClassName("options");
const quizButton = document.getElementsByClassName("button-container");
const nextButton = document.getElementById("next-button");

console.log(quizContainer, quizQuestion, quizOption, quizButton, nextButton);

const firstQuestion = quiz_Ghibli.questions[0];

firstQuestion.innerText = firstQuestion;

console.log(firstQuestion);

firstQuestion.options.forEach((option) => {
  const option_btn = document.createElement("button");
  option_btn.innerText = option;
  option_btn.classList.add("options");
  quizOption.appendChild("option_btn");
});

console.log(quizOption);
