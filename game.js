import { quiz_Ghibli } from "./question.js"; //lien avec le fichier questions.js

let currentQuestionIndex = 0; //déclaration index de la question actuelle

//déclaration des constantes pour récupérer éléments HTML
const quizContainer = document.getElementById("quiz-container");
const quizQuestion = document.querySelector(".question");
const quizOption = document.querySelector(".options");
const nextButton = document.getElementById("next-button");
const replayButton = document.getElementById("replay-button");
const startButton = document.getElementById('start-button');
const pageAccueil = document.getElementById('home');
const timerDisplay = document.getElementById("timer");
const barre = document.getElementById('myBar');
const progressContainer = document.getElementById('myProgress');

let score = 0;
let timeLeft = 45; //temps pour la durée du quiz
let timerId; // variable qu'on apelle après pour faire fonctioner le timer
let progress = 0; // définit le progrès à 0 pour la barre de progression

function updateProgressBar() { // Fonction pour mettre à jour la barre de progression
  const totalQuestions = quiz_Ghibli.questions.length; // déclare la longueur du tableau pour le total de la barre de progression
  const progressPercent = ((currentQuestionIndex) / totalQuestions) * 100; // variable pour savoir quelle est la progression faite
  barre.style.width = progressPercent + "%"; // donne le style à la barre pour montrer la progression selon le %
}

function loadQuestion () { //déclaration fonction pour afficher chaque question
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
    option_btn.classList.add('correct');//style bonne réponse
    score++ // incrémente le score si la réponse est correcte

  }else{//sinon
    option_btn.classList.add('wrong');//style mauvaise réponse
  }
  });
  }
  checkAnswer();
  });
  updateProgressBar(); // mettre à jour la barre quand la question est affichée
}

nextButton.addEventListener('click', () => {  // écouteur d'évenements pour le bouton "suivant"
  currentQuestionIndex++; //incrémente l'index de la question
  if(currentQuestionIndex < quiz_Ghibli.questions.length) { // si l'index de la question actuelle fait partie de la longueur du tableau questions de l'objet quiz_Ghibli 
  loadQuestion(); // appel de la question suivante
   } else { //sinon
      quizQuestion.innerText = 'Fin du quiz. Merci ! 🌸 '; // affichage 'fin du quiz'
      timerDisplay.style.display = 'none'; // on cache le timer

      if (score == 1) { // affichage de phrase selon le score obtenu
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Pas grave ! Même Chihiro a dû travailler dur avant de s’en sortir !';
       } else if (score == 2) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Tu connais bien le monde de Ghibli, mais il reste encore quelques secrets à découvrir derrière les nuages.';
       } else if (score == 3) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Les Kodamas te saluent : tu es en harmonie avec l’esprit Ghibli.';
       } else if (score == 4) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Ton score brille comme le feu de Calcifer — impressionnant !';
       } else if (score == 5) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. Totoro t’ouvre grand son parapluie : tu fais partie de la famille Ghibli !';
       } else if (score == 0) {
          quizOption.innerHTML = 'Votre score est de : ' + score + '. On dirait que tu t’es perdu dans la Forêt des Esprits. Essaie encore, Totoro croit en toi !';
      }
      
       
  nextButton.style.display = 'none'; //bouton n'apparait pas
  replayButton.style.display = 'inline-block'; // bouton qui apparait à la fin du quiz
  }
  });
loadQuestion();

function startTimer() { //fonction timer
clearInterval(timerId); // Définit l'interval selon timerId
timeLeft = 45; // temps restant
timerDisplay.textContent = timeLeft // affiche la quantité de temps en format "texte" dans le timer

timerId = setInterval(() => { // fonction pour l'intervalle de temps
  timeLeft--; // décrémentation du temps
  timerDisplay.textContent = timeLeft; // affiche la quantité de temps en format "texte" dans le timer

  if (timeLeft <= 0) { // si le timer arrive à 0
    endQuiz('timeout'); // on donne la valeur du endQuiz comme 'timeout'
    }
  }, 1000 ); // vitesse du temps 
}
function stopTimer() { // fonction pour arreter le timer
  clearInterval(timerId); // vide l'intervale
  timerId= null; // le temps devient nul (pas à 0)
}

function endQuiz(reason) { // Fin du quiz
  stopTimer(); // on apelle la fonction pour arreter le timer
  timerDisplay.style.display = 'none'; // on cache le timer
  nextButton.style.display = 'none'; // on cacher le bouton 'Suivant'
  replayButton.style.display = 'inline-block'; // on affiche le bouton 'Rejouer'
  progressContainer.style.display = 'none'; // on cache la barre de progression

  let message = ''; // message vide pour injecter chaque message de fin
  if (reason === 'timeout') { // si la raison est timeout
    quizQuestion.innerText = '⏰ Temps écoulé !'; // phrase affichée
    message = `Votre score est de ${score} avant la fin du temps.`; // phrase affichée
  } else {
    quizQuestion.innerText = "Fin du quiz. Merci ! 🌸";
  }
  quizOption.innerHTML = message;
}

replayButton.addEventListener('click', () => {// Fonction pour réinitialiser le quiz
  stopTimer(); 
  pageAccueil.style.display = 'inline-block';// on affiche page accueil
  quizContainer.style.display = 'none';//on cache le quiz
  progressContainer.style.display = 'block'; // on réaffiche la barre de progression pour la prochaine partie
  barre.style.width = '0%'; // réinitialise la barre
});

startButton.addEventListener('click', () => {//écouteur d'évenement sur le bouton start 

  score = 0; // réinitialise le score 
  currentQuestionIndex = 0;// Réinitialiser l'index 
  timeLeft = 45;

  pageAccueil.style.display = 'none';// on cache la page d'accueil
  quizContainer.style.display = 'inline-block';// on affiche le quiz
  timerDisplay.style.display = 'inline-block'; // on affiche le timer
  nextButton.style.display = 'inline-block';//on affiche le bouton suivant
  replayButton.style.display = 'none';// Cacher le bouton Rejouer et afficher le bouton Suivant
  progressContainer.style.display = 'block'; // on affiche la barre de progression
  barre.style.width = '0%'; // la barre commence a 0%

  loadQuestion();
  startTimer();
  }); 

