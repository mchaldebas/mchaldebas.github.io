document.addEventListener('DOMContentLoaded', function() {
    
    const hero = document.getElementById('hero');
    const heroTitle = document.querySelector('#hero h1');
    const heroSubtitle = document.querySelector('#hero .hero-subtitle');

    if (hero && heroTitle && heroSubtitle) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

            hero.style.backgroundPosition = `calc(50% + ${x * -35}px) calc(50% + ${y * -35}px)`;

            const shadowX = x * -40;
            const shadowY = y * -40;
            const titleShadow = `
                ${shadowX / 4}px ${shadowY / 4}px 5px rgba(0, 0, 0, 0.6),
                ${shadowX / 2}px ${shadowY / 2}px 15px rgba(0, 0, 0, 0.4),
                ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3)
            `;

            const subtitleShadow = `
                ${shadowX / 4}px ${shadowY / 4}px 3px rgba(0, 0, 0, 0.7),
                ${shadowX / 2}px ${shadowY / 2}px 10px rgba(0, 0, 0, 0.5)
            `;
            
            heroTitle.style.textShadow = titleShadow;
            heroSubtitle.style.textShadow = subtitleShadow;
        });
    }

    // --- Show/Hide Nav on Scroll ---
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight * 0.85) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });

    // --- Intersection Observer for Fade-in animations ---
    const FADE_IN_OBSERVER = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                FADE_IN_OBSERVER.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach((el) => FADE_IN_OBSERVER.observe(el));

    // --- Intersection Observer for Active Nav Link Highlighting ---
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