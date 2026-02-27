const tecnologias = [
    {
        id: 1,
        titulo: "Sistema Inteligente Ambiental",
        tipo: "Patente de Invenção",
        status: "Depositado",
        area: "Meio Ambiente",
        resumo: "Monitoramento hídrico inteligente.",
        detalhes: "Tecnologia baseada em sensores IoT."
    },
    {
        id: 2,
        titulo: "Software Educacional UNEB",
        tipo: "Programa de Computador",
        status: "Registrado",
        area: "Educação",
        resumo: "Plataforma adaptativa de ensino.",
        detalhes: "Sistema com IA aplicada à educação."
    },
    {
        id: 3,
        titulo: "Marca UNEB Inova",
        tipo: "Marca",
        status: "Concedido",
        area: "Ciências Sociais",
        resumo: "Identidade visual institucional.",
        detalhes: "Marca registrada no INPI."
    }
];

/* MENU */
function toggleMenu() {
    document.getElementById("nav-main-menu").classList.toggle("show");
}

/* INDICADORES */
function atualizarTotalDeAtivos() {

    function getNumero(id) {
        return parseInt(document.getElementById(id).textContent) || 0;
    }

    const desenhos = getNumero("indicator-desenhos");
    const softwares = getNumero("indicator-softwares");
    const patentes = getNumero("indicator-patentes");
    const marcas = getNumero("indicator-marcas");

    const total = desenhos + softwares + patentes + marcas;

    document.getElementById("indicator-total-assets").textContent = total;

    const totalJS = tecnologias.length;
    const patentesJS = tecnologias.filter(t => t.tipo === "Patente de Invenção").length;
    const softwaresJS = tecnologias.filter(t => t.tipo === "Programa de Computador").length;
    const marcasJS = tecnologias.filter(t => t.tipo === "Marca").length;
    const desenhosJS = tecnologias.filter(t => t.tipo === "Desenho Industrial").length;

    setNumero("indicator-total-assets", totalHTML + totalJS);
    setNumero("indicator-patentes", patentesHTML + patentesJS);
    setNumero("indicator-softwares", softwaresHTML + softwaresJS);
    setNumero("indicator-marcas", marcasHTML + marcasJS);
    setNumero("indicator-desenhos", desenhosHTML + desenhosJS);
}

/* FILTROS */
function createFilters(list, containerId, name) {
    const container = document.getElementById(containerId);
    list.forEach(item => {
        container.innerHTML += `
            <label>
                <input type="checkbox" name="${name}" value="${item}"> ${item}
            </label><br>
        `;
    });
}

const tipos = [...new Set(tecnologias.map(t => t.tipo))];
const statusList = [...new Set(tecnologias.map(t => t.status))];
const areas = [...new Set(tecnologias.map(t => t.area))];

createFilters(tipos, "filter-type", "tipo");
createFilters(statusList, "filter-status", "status");
createFilters(areas, "filter-area", "area");

/* CARDS */
function getChecked(name) {
    return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(el => el.value);
}

function renderCards() {
    const container = document.getElementById("cards-container");
    const search = document.getElementById("filter-search-input").value.toLowerCase();

    container.innerHTML = "";

    tecnologias
        .filter(t =>
            t.titulo.toLowerCase().includes(search) &&
            (getChecked("tipo").length === 0 || getChecked("tipo").includes(t.tipo)) &&
            (getChecked("status").length === 0 || getChecked("status").includes(t.status)) &&
            (getChecked("area").length === 0 || getChecked("area").includes(t.area))
        )
        .forEach(t => {
            container.innerHTML += `
                <div class="card">
                    <span class="tag">${t.tipo}</span>
                    <h4>${t.titulo}</h4>
                    <p>${t.resumo}</p>
                    <button onclick="showDetails(${t.id})">Saber Mais</button>
                </div>
            `;
        });
}

/* MODAL */
function showDetails(id) {
    const tech = tecnologias.find(t => t.id === id);
    document.getElementById("modal-content-details").innerHTML = `
        <h2>${tech.titulo}</h2>
        <p><strong>Tipo:</strong> ${tech.tipo}</p>
        <p><strong>Status:</strong> ${tech.status}</p>
        <p><strong>Área:</strong> ${tech.area}</p>
        <p>${tech.detalhes}</p>
    `;
    document.getElementById("modal-details").style.display = "block";
}

function closeModal() {
    document.getElementById("modal-details").style.display = "none";
}

/* EVENTOS */
document.addEventListener("input", renderCards);

atualizarTotalDeAtivos();
renderCards();
