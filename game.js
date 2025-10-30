import { quiz_Ghibli } from "./question.js"; //lien avec le fichier questions.js

let currentQuestionIndex = 0; //déclaration index de la question actuelle

//déclaration des constantes pour récupérer éléments HTML
const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.querySelector(".question");
const quizOption = document.querySelector(".options");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");
let score = 0;

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

      nextButton.disabled = true; // par defaut le bouton Suivant n'est pas clickable

      function checkAnswer(){
      option_btn.addEventListener('click', ()=> { //écouteur d'évenement pour le bouton selectionné        
        const allButtons = quizOption.querySelectorAll("button"); //déclare une constante pour tous les boutons
        allButtons.forEach(btn => btn.disabled = true); // Je désactive tous les boutons après avoir cliqué
        nextButton.disabled = false; // dès qu'il existe un 'click' sur une des options, le bouton Souivant s'active 
        
        if (option_btn.innerText === currentQuestion.correct_answer){//si l'option du bouton (texte réponse) est correct
          option_btn.classList.add("correct");//style bonne réponse
          score++ // incrémente le score si la réponse est correcte

        }else{//sinon
          option_btn.classList.add("wrong");//style mauvaise réponse
        }
      });
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
      }
      if (score == 1) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Pas grave ! Même Chihiro a dû travailler dur avant de s’en sortir !';
        } else if (score == 2) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Tu connais bien le monde de Ghibli, mais il reste encore quelques secrets à découvrir derrière les nuages.';
        } else if (score == 3) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Les Kodamas te saluent : tu es en harmonie avec l’esprit Ghibli.';
        } else if (score == 4) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Ton score brille comme le feu de Calcifer — impressionnant !';
        } else if (score == 5) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Totoro t’ouvre grand son parapluie : tu fais partie de la famille Ghibli !';
        }
      nextButton.style.display = 'none'; //bouton n'apparait pas
      replayButton.style.display = 'inline-block'; // bouton qui apparait à la fin du quiz
    });
loadQuestion();

// Fonction pour réinitialiser le quiz
replayButton.addEventListener('click', () => {
  score = 0; // réinitialise le score
  
  currentQuestionIndex = 0;// Réinitialiser l'index 
   replayButton.style.display = 'none';// Cacher le bouton Rejouer et afficher le bouton Suivant
   nextButton.style.display = 'inline-block';// Recharger la première question
  
  loadQuestion();
  
});












