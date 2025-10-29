import { quiz_Ghibli } from "./question.js";

let currentQuestionIndex = 0; 

const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.querySelector(".question");
const quizOption = document.querySelector(".options");
const nextButton = document.getElementById("next-button");

function loadQuestion () {
    quizQuestion.innerHTML = '';
    const currentQuestion = quiz_Ghibli.questions[currentQuestionIndex];
    quizQuestion.innerText = currentQuestion.text;

    currentQuestion.options.forEach(option => {
    const option_btn = document.createElement('button');
    option_btn.innerText = option;
    option_btn.classList.add("options");
    quizOption.appendChild(option_btn);
    });

    nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < currentQuestionIndex.questions.length) {
    loadQuestion();
    } else {
      quizQuestion.innerText = 'fin du quiz';
      quizOption.innerHTML = '';
      nextButton.style.display = 'none';
    }
    }
);


} 


loadQuestion();








