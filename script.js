// ===== PARTIE 1 : LA PUB QUI PASSE TOUTE SEULE =====
let slides = document.querySelectorAll('.slide');
let audio = document.getElementById('voixAudio');
let i = 0;
let aLance = false;

function show(n){
  slides.forEach(s=>s.classList.remove('active'));
  let slide = slides[n];
  slide.classList.add('active');
  slide.querySelectorAll('.anim').forEach(el=>{
    el.style.animation = 'none'; el.offsetHeight; el.style.animation = '';
  });
  document.getElementById('bar').style.width = ((n+1)/slides.length*100)+'%';
}

// 45 secondes total - calé sur la voix

let temps = [0, 7, 15, 25, 34, 42];

function lancer(){
  if(aLance) return;
  aLance = true;
  document.getElementById('entrer').style.display = 'none';
  show(0);
  audio.play();
  let start = Date.now();
  let timer = setInterval(()=>{
    let t = (Date.now() - start) / 1000;
    let cur = 0;
    for(let k=0;k<temps.length;k++){ if(t >= temps[k]) cur = k; }
    if(cur !== i){ i = cur; show(i); }
    if(audio.ended || t > 52){ clearInterval(timer); show(5); }
  }, 200);
}

// ===== PARTIE 2 : QUAND ON CLIQUE DANS LA PUB =====

// 1. Si on clique sur une carte menu dans la pub -> ça commande direct ce plat
function commanderPlat(nom, prix){
  let message = `Bonjour FAST-FOOD, je veux commander !%0A%0A- ${nom} : ${prix} FCFA`;
  window.open(`https://wa.me/212631844352?text=${message}`, '_blank');
}

// 2. Si on clique sur le slide 2 (Menu), ça va direct au slide final Commander
document.querySelectorAll('.slide').forEach((slide, index) => {
  slide.addEventListener('click', (e) => {
    // Si on clique sur un bouton ou un lien, on laisse faire
    if(e.target.closest('a') || e.target.closest('button')) return;
    // Si on est sur le slide Menu (index 1) et on clique, on va au slide Commander
    if(index === 1){
      show(4);
      i = 4;
    }
  });
});

// 3. Rendre les cartes du menu cliquables
document.querySelectorAll('.card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    let texte = card.innerText; // Ex: "🍔 Burger Classique 3 500 F"
    let message = `Bonjour FAST-FOOD, je veux commander !%0A%0A- ${texte}`;
    window.open(`https://wa.me/212631844352?text=${encodeURIComponent(message)}`, '_blank');
  });
});