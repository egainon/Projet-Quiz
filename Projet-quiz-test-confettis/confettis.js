// On récupère les éléments HTML
const container = document.querySelector('.slot');
const button = document.querySelector('.btn-confettis');

const emojis = ["🌸", "🐈‍⬛", "🍃", "🏯"]; // Les emojis à afficher

button.addEventListener('click', () => {// Quand on clique sur le bouton → lancer les confettis   
 
  for (let i = 0; i < 50; i++) { // On crée 50 confettis
    const confetti = document.createElement('div');
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(confetti);
    
    confetti.style.fontSize = "50px"; // Taille des confettis

    gsap.set(confetti, { // Position initiale au centre
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1
    });

    gsap.to(confetti, { // Animation GSAP (GreenSock Animation Platform) : librairie javascript pour animations
      duration: 3,
      x: Math.random() * 600 - 300,   // déplacement aléatoire X
      y: Math.random() * 500 - 400,   // déplacement aléatoire Y
      z: Math.random() * 300 - 150,   // profondeur 3D
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360,
      rotationZ: Math.random() * 360,
      opacity: 0,
      onComplete: () => confetti.remove() //Supprime du dom quand animation finie
    });
  }
});
