document.addEventListener("DOMContentLoaded", function(){

const cards = document.querySelectorAll(".team-card");

function mostrarCards(){

const trigger = window.innerHeight * 0.85;

cards.forEach(card => {

const cardTop = card.getBoundingClientRect().top;

if(cardTop < trigger){
card.classList.add("show");
}

});

}

window.addEventListener("scroll", mostrarCards);

mostrarCards();

});