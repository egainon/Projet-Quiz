import { quiz_Ghibli } from "./question.js"; //lien avec le fichier questions.js

let currentQuestionIndex = 0; //déclaration index de la question actuelle

//déclaration des constantes pour récupérer éléments HTML
const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.querySelector(".question");
const quizOption = document.querySelector(".options");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");

//déclaration fonction pour afficher chaque question
function loadQuestion () {
    quizQuestion.innerHTML = ''; //contenu reste vide
    const currentQuestion = quiz_Ghibli.questions[currentQuestionIndex];//variable qui reprend une question du fichier question.js par rapport à l'index de l'objet quiz_Ghibli
    quizQuestion.innerText = currentQuestion.text;//inclusion du texte (récupéré de l'objet questions)

    quizOption.innerHTML = ''; //contenu vide pour les options
    currentQuestion.options.forEach(option => { //injecter les options dans le HTML pour les questions
    const option_btn = document.createElement('button'); //déclaration constante qui va créer le bouton de chaque option
    option_btn.innerText = option; //affichage du texte récupéré dans le fichier question.js dans le bouton
    option_btn.classList.add("options"); // ajout d'une classe pour le bouton pour le stylisé dans le CSS
    quizOption.appendChild(option_btn); //noeud pour rattacher au parent quizOption

    function checkAnswer(){
    option_btn.addEventListener('click', ()=> {//écouteur d'évenement pour le bouton selectionné
      if (option_btn.innerText === currentQuestion.correct_answer){//si l'option du bouton (texte réponse) est correct
        option_btn.classList.add("correct");//style bonne réponse
        
      }else{//sinon
        option_btn.classList.add("wrong");//style mauvaise réponse
        
      }
    })
    if (option_btn.addEventListener == true){
    option_btn.disabled = true;
   }
    }
    checkAnswer();
   

    });
}

    nextButton.addEventListener('click', () => {  // écouteur d'évenements pour le bouton "suivant"
    currentQuestionIndex++; //incrémente l'index de la question
    if(currentQuestionIndex < quiz_Ghibli.questions.length) { // si l'index de la question actuelle fait partie de la longueur du tableau questions de l'objet quiz_Ghibli 
    loadQuestion(); // appel de la question suivante
    } else { //sinon
      quizQuestion.innerText = 'Fin du quiz. Merci ! 🌸 '; // affichage 'fin du quiz'
      quizOption.innerHTML = ''; // contenu vide des options
      nextButton.style.display = 'none'; //bouton n'apparait pas
      replayButton.style.display = 'inline-block'; // bouton qui apparait à la fin du quiz
    }
    });
loadQuestion();

// Fonction pour réinitialiser le quiz
replayButton.addEventListener('click', () => {
  // Réinitialiser l'index 
  currentQuestionIndex = 0;
  // Cacher le bouton Rejouer et afficher le bouton Suivant
   replayButton.style.display = 'none';
   nextButton.style.display = 'inline-block';
  // Recharger la première question
  loadQuestion();
  
});












