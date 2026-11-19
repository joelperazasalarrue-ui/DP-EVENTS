// ===== Menú móvil =====
const menuToggle = document.getElementById('menu-toggle');
const menuLinks = document.getElementById('menu-links');

if (menuToggle && menuLinks) {
    menuToggle.addEventListener('click', () => {
        menuLinks.classList.toggle('activo');
    });
}

// ===== Carruseles =====
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.children;
    const dotsBox = carousel.querySelector('.carousel-dots');
    const INTERVAL = 4000 + Math.random() * 1500; // evita que todos avancen a la vez
    let index = 0;
    let timer;

    // Puntos
    [...slides].forEach((_, n) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Foto ${n + 1}`);
        dot.addEventListener('click', () => { go(n); restart(); });
        dotsBox.appendChild(dot);
    });
    const dots = dotsBox.children;

    function go(n) {
        index = (n + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        [...dots].forEach((d, k) => d.classList.toggle('active', k === index));
    }

    const start = () => { stop(); timer = setInterval(() => go(index + 1), INTERVAL); };
    const stop = () => clearInterval(timer);
    const restart = () => { stop(); start(); };

    // Flechas
    carousel.querySelector('.prev').addEventListener('click', () => { go(index - 1); restart(); });
    carousel.querySelector('.next').addEventListener('click', () => { go(index + 1); restart(); });

    // Pausa al pasar el mouse
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    // Deslizar en móvil
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) go(diff < 0 ? index + 1 : index - 1);
        start();
    });

    go(0);
    start();
});