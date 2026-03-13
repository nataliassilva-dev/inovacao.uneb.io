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
    title: "I Colóquio Baiano de Direitos e Tecnologias Digitais",
    date: "03 dez 2025",
    excerpt: "A universidade fortalece sua política de proteção intelectual.",
    image: "https://inovacao.uneb.br/wp-content/uploads/2025/12/Programacao-I-Coloquio-Baiano-Direitos-e-Tecnologias-Digitais_page-0001.jpg",
    link: "#"
  },
  {
    title: "Chamada para o 2º Workshop de Inovação: Empresas juniores, Startups e Tecnologias em Rede. INSCRIÇÕES ABERTAS",
    date: "9 abr 2025",
    excerpt: "Propriedade Industrial e Intelectual",
    image: "https://inovacao.uneb.br/wp-content/uploads/2025/04/II-ENCONTRO-POSTS-INSTAGRAM.png",
    link: "https://inovacao.uneb.br/chamada-para-o-2o-workshop-de-inovacao-empresas-juniores-startups-e-tecnologias-em-rede/"
  },
  {
    title: "II Encontro Baiano de Ciência, Tecnologia e Inovação",
    date: "18 julho 2024",
    excerpt: "Apresentações de trabalhos nos Grupos de Trabalho (GTs), exposições de startups emergentes. e reunião com os NITS baianos",
    image: "https://inovacao.uneb.br/wp-content/uploads/2025/01/II-ENCONTRO-POSTS-INSTAGRAM-1024x1024.png",
    link: "https://inovacao.uneb.br/ii-encontro-baiano-de-ciencia-tecnologia-e-inovacao/"
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

function loadComponent(id, file){

fetch(file)
.then(response => response.text())
.then(data => {

document.getElementById(id).innerHTML = data

})

}

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Aumentar / Diminuir fonte
  const increaseBtn = document.getElementById('increase-font');
  const decreaseBtn = document.getElementById('decrease-font');
  const contrastBtn = document.getElementById('toggle-contrast');

  if (increaseBtn) {
    increaseBtn.addEventListener('click', () => {
      let size = parseInt(window.getComputedStyle(body).fontSize);
      body.style.fontSize = (size + 2) + 'px';
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener('click', () => {
      let size = parseInt(window.getComputedStyle(body).fontSize);
      body.style.fontSize = (size - 2) + 'px';
    });
  }

  if (contrastBtn) {
    contrastBtn.addEventListener('click', () => {
      body.classList.toggle('high-contrast');
    });
  }

  // VLibras já é link externo, não precisa de JS extra
});

loadComponent("header","components/header.html")
loadComponent("footer","components/footer.html")