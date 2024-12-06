let currentPage = 0;  // Variável para controlar em qual página estamos

// Seleciona a primeira página (com a classe 'full') e as páginas com a classe 'content'
const pages = [document.querySelector('.full'), ...document.querySelectorAll('.content')];

const scrollNext = document.getElementById('scrollNext');  // Seleciona o botão "Próximo"
const scrollBack = document.getElementById('scrollBack');  // Seleciona o botão "Voltar"

// Função para rolar até a próxima página
function scrollToNextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
    } else {
        currentPage = 0;  // Volta para a primeira página quando chega na última
    }
    pages[currentPage].scrollIntoView({ behavior: 'smooth' });
}

// Função para voltar para a página anterior
function scrollToPreviousPage() {
    if (currentPage > 0) {
        currentPage--;
    } else {
        currentPage = pages.length - 1;  // Vai para a última página se estiver na primeira
    }
    pages[currentPage].scrollIntoView({ behavior: 'smooth' });
}

// Bloqueia a rolagem manual
window.addEventListener('wheel', function (e) {
    e.preventDefault();  // Impede a rolagem padrão
}, { passive: false });

// Adiciona os eventos de clique aos botões
scrollNext.addEventListener('click', scrollToNextPage);
scrollBack.addEventListener('click', scrollToPreviousPage);
