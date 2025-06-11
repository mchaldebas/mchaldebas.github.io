window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > window.innerHeight * 0.85) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});

const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    hero.style.backgroundPosition = `calc(50% + ${x * -35}px) calc(50% + ${y * -35}px)`;
});

document.addEventListener('DOMContentLoaded', function() {
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

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-nav .nav-links a');
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`#main-nav .nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});