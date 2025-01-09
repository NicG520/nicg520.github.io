document.addEventListener('DOMContentLoaded', () => {
    // Configuração de sliders com Hammer.js
    const container = document.querySelector('.container');
    container.querySelectorAll('.slider').forEach((slider) => {
        const hammer = new Hammer(slider);
        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('panmove', (e) => {
            slider.style.transform = `translate(${e.deltaX}px, ${e.deltaY}px) rotate(0deg)`;
        });

        hammer.on('panend', (e) => {
            const threshold = 150;
            if (Math.abs(e.deltaX) > threshold) {
                slider.style.transition = 'transform 0.3s ease';
                const direction = e.deltaX > 0 ? 1 : -1;
                slider.style.transform = `translate(${direction * 200}vw, 0) rotate(0deg)`;

                setTimeout(() => {
                    slider.style.transition = '';
                    if (direction > 0) container.appendChild(slider);
                    else container.insertBefore(slider, container.firstChild);

                    resetPositions();
                }, 300);
            } else {
                slider.style.transition = 'transform 0.3s ease';
                slider.style.transform = 'translate(0, 0) rotate(0deg)';
            }
        });
    });

    function resetPositions() {
        const sliders = Array.from(container.querySelectorAll('.slider'));
        const visibleLimit = 5; // Limite de cartas visíveis
        sliders.forEach((slider, index) => {
            slider.style.transition = 'transform 0.6s ease';

            if (index < visibleLimit) {
                const offset = index - Math.floor(sliders.length / 2);

                // Carta começando da esquerda
                slider.style.transform = `rotate(${offset * 0.6}deg) translateX(-100vw)`;

                // Agora animar para seu ponto central
                setTimeout(() => {
                    slider.style.transform = `rotate(${offset * 0.6}deg) translateX(0)`;
                }, 0);

                slider.style.zIndex = sliders.length - index;
            } else {
                // Mover as demais cartas para fora da tela
                slider.style.transform = 'translateX(-100vw) rotate(0deg)';
                slider.style.zIndex = 0;
            }
        });
    }

    resetPositions();

    // Configuração de rolagem entre páginas
    const pages = [document.querySelector('.full'), ...document.querySelectorAll('.content')];
    let currentPage = 0;

    const scrollNext = document.getElementById('scrollNext');
    const scrollBack = document.getElementById('scrollBack');

    function scrollToNextPage() {
        if (currentPage < pages.length - 1) currentPage++;
        else currentPage = 0;

        pages[currentPage].scrollIntoView({ behavior: 'smooth' });
    }

    function scrollToPreviousPage() {
        if (currentPage > 0) currentPage--;
        else currentPage = pages.length - 1;

        pages[currentPage].scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
    scrollNext.addEventListener('click', scrollToNextPage);
    scrollBack.addEventListener('click', scrollToPreviousPage);
});

function calcularTempo() {
    const dataInicial = new Date(2023, 0, 9);
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicial.getFullYear();
    let meses = agora.getMonth() - dataInicial.getMonth();
    let dias = agora.getDate() - dataInicial.getDate();
    let horas = agora.getHours() - dataInicial.getHours();
    let minutos = agora.getMinutes() - dataInicial.getMinutes();
    let segundos = agora.getSeconds() - dataInicial.getSeconds();

    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    // Atualizando os valores na tabela
    document.getElementById("anos").textContent = anos;
    document.getElementById("meses").textContent = meses;
    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;

    // Caso precise mostrar segundos em outro elemento (opcional)
    document.getElementById("tempo").innerHTML = 
        `${anos} anos<br>${meses} meses<br>${dias} dias<br>${horas} horas<br>${minutos} minutos<br>${segundos} segundos`;
}

// Atualizar o contador a cada segundo
setInterval(calcularTempo, 1000);
calcularTempo();





