document.addEventListener('DOMContentLoaded', function() {
    
    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // --- Mobile Navigation Functionality ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNavMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNavToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
            mobileNavToggle.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    const hero = document.getElementById('hero');
    const heroTitle = document.querySelector('#hero h1');
    const heroSubtitle = document.querySelector('#hero .hero-subtitle');

    if (hero && heroTitle && heroSubtitle) {
        function handleHeroMousemove(e) {
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
        }
        function enableHeroParallax() {
            hero.addEventListener('mousemove', handleHeroMousemove);
            hero.style.backgroundAttachment = 'fixed';
        }
        function disableHeroParallax() {
            hero.removeEventListener('mousemove', handleHeroMousemove);
            hero.style.backgroundAttachment = 'scroll';
            hero.style.backgroundPosition = '';
            heroTitle.style.textShadow = '';
            heroSubtitle.style.textShadow = '';
        }
        function checkHeroParallax() {
            if (window.innerWidth >= 900) {
                enableHeroParallax();
            } else {
                disableHeroParallax();
            }
        }
        checkHeroParallax();
        window.addEventListener('resize', checkHeroParallax);
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

    const elementsToAnimate = document.querySelectorAll('.fade-in, h2');
    elementsToAnimate.forEach((el) => FADE_IN_OBSERVER.observe(el));

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
    const navButton = document.querySelector('.nav-button');
    if (navButton) {
        navButton.addEventListener('mousemove', e => {
            const rect = navButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            navButton.style.setProperty('--mouse-x', `${x}px`);
            navButton.style.setProperty('--mouse-y', `${y}px`);
        });
    }
    
    // Update copyright year
    document.getElementById('copyright-year').innerHTML = `© ${new Date().getFullYear()} Matthieu Chaldebas. All Rights Reserved.`;

    // --- Section Fade-in/Slide-in Animation ---
    const fadeSections = document.querySelectorAll('section, .section-fade-in');
    fadeSections.forEach(section => section.classList.add('section-fade-in'));
    const sectionFadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionFadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeSections.forEach(section => sectionFadeObserver.observe(section));
});