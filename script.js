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
    title: "UNEB amplia registros de patentes em 2025",
    date: "10 fev 2025",
    excerpt: "A universidade fortalece sua política de proteção intelectual com novos depósitos.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    link: "#"
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