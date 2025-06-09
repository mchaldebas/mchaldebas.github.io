window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > window.innerHeight * 0.85) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});

const FADE_IN_OBSERVER = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const elementsToFadeIn = document.querySelectorAll('.fade-in');
elementsToFadeIn.forEach((el) => FADE_IN_OBSERVER.observe(el));

const hero = document.getElementById('hero');

hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    hero.style.backgroundPosition = `calc(50% + ${x * -20}px) calc(50% + ${y * -20}px)`;
});
