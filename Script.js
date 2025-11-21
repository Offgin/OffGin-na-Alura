let container = document.querySelector(".container");
let caixaBusca = document.querySelector("#caixa-busca"); // Supondo que você tenha um input com id="caixa-busca" no seu HTML
let dados = [];

// Chama a função para carregar os dados quando o documento estiver pronto.
window.addEventListener('DOMContentLoaded', iniciarBusca);

// Adiciona o listener apenas se a caixa de busca existir, para evitar erros.
if (caixaBusca) {
    caixaBusca.addEventListener("keyup", buscar);
}

async function iniciarBusca() {
    let resposta = await fetch("Gin.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function buscar() {
    const termoBusca = caixaBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado => {
        // Se o campo de busca estiver vazio, mostra todos os dados.
        if (termoBusca === "") {
            return true;
        }
        // Caso contrário, busca por nomes, anos ou empresas que contenham o termo de busca.
        return dado.Nome.toLowerCase().includes(termoBusca) ||
               String(dado.Ano).toLowerCase().includes(termoBusca) ||
               dado.Empresa.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dadosParaRenderizar) {
    container.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
<h2>${dado.Nome}</h2>
        <p>${dado.Ano}</p>
        <p>${dado.Empresa}</p>
        <p>${dado.Descrição || ''}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;
        container.appendChild(article);
    }
}
