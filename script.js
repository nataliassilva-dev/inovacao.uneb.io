// Menu Mobile
const toggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Animação ao Scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const visible = 100;

    if (elementTop < windowHeight - visible) {
      element.classList.add('active');
    }
  });
}

/* =========================
   Notícias dinâmicas PI
========================= */

const newsData = [
  {
    title: "Mulheres na propriedade intelectual",
    date: "10 março 2026",
    excerpt: "A universidade fortalece sua política de proteção intelectual com novos depósitos.",
    image: "https://images.jota.info/wp-content/uploads/2026/03/business-idea-concept-with-bulb-scaled.jpg",
    link: "https://www.jota.info/opiniao-e-analise/colunas/propriedade-intelectual-inovacao/mulheres-na-propriedade-intelectual"
  },
  {
    title: "Inscrições abertas em curso online sobre busca de informações de patentes",
    date: "19 fev 2026",
    excerpt: "Propriedade Industrial e Intelectual",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    link: "https://www.gov.br/inpi/pt-br/central-de-conteudo/noticias/inscricoes-abertas-em-curso-online-sobre-busca-de-informacoes-de-patentes"
  },
  {
    title: "Curso Geral de PI à Distância terá inscrições a partir de 12/01",
    date: "09 jan 2026",
    excerpt: "Capacitação em Propriedade Intelectual.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
    link: "https://www.gov.br/inpi/pt-br/central-de-conteudo/noticias/curso-geral-de-pi-a-distancia-tera-inscricoes-a-partir-de-08-04-1"
  }
];

function renderNews() {
  const container = document.getElementById("news-container");
  if (!container) return;

  container.innerHTML = newsData.map(news => `
    <article class="news-card reveal">
      <img src="${news.image}" alt="${news.title}" class="news-image">
      <div class="news-content">
        <div class="news-date">${news.date}</div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <a href="${news.link}" class="news-link">Ler mais →</a>
      </div>
    </article>
  `).join("");

  // reativa animação reveal
  revealOnScroll();
}

// Executa ao carregar
document.addEventListener("DOMContentLoaded", renderNews);

window.addEventListener('scroll', revealOnScroll);

/* =========================
   HERO SLIDER PROFISSIONAL
========================= */

document.addEventListener("DOMContentLoaded", () => {

const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");

let index = 0;

/* criar bolinhas */

slides.forEach((_, i) => {

const dot = document.createElement("span");
dot.classList.add("dot");

if(i === 0) dot.classList.add("active");

dot.addEventListener("click", () => {
index = i;
updateSlider();
});

dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

/* atualizar slider */

function updateSlider(){

slides.forEach(slide => slide.classList.remove("active"));
slides[index].classList.add("active");

dots.forEach(dot => dot.classList.remove("active"));
dots[index].classList.add("active");

}

/* botões */

next.addEventListener("click", () => {

index++;

if(index >= slides.length){
index = 0;
}

updateSlider();

});

prev.addEventListener("click", () => {

index--;

if(index < 0){
index = slides.length - 1;
}

updateSlider();

});

/* autoplay */

setInterval(() => {

index++;

if(index >= slides.length){
index = 0;
}

updateSlider();

},5000);

/* swipe mobile */

let startX = 0;

document.querySelector(".slider").addEventListener("touchstart", e => {
startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", e => {

let endX = e.changedTouches[0].clientX;

if(startX - endX > 50){

index++;

if(index >= slides.length) index = 0;

updateSlider();

}

if(endX - startX > 50){

index--;

if(index < 0) index = slides.length - 1;

updateSlider();

}

});

});

/* parallax hero */

window.addEventListener("scroll", () => {

const slides = document.querySelectorAll(".slide");
const scroll = window.pageYOffset;

slides.forEach(slide=>{
slide.style.backgroundPositionY = scroll * 0.3 + "px";
});

});

const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {

let count = 0;
const target = +counter.getAttribute('data-target');
const increment = target / 200;

const update = () => {

count += increment;

if(count < target){
counter.innerText = Math.ceil(count);
requestAnimationFrame(update);
}
else{
counter.innerText = target;
}

};

update();

};

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

const counter = entry.target;

if(!counter.classList.contains("started")){
startCounter(counter);
counter.classList.add("started");
}

}

});

}, { threshold: 0.5 });

counters.forEach(counter => {
observer.observe(counter);
});

