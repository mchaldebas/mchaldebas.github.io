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


async function getCitationCount() {
    const scholarId = 'c2xVFBwAAAAJ';
    const citationElement = document.getElementById('citation-count');

    if (!citationElement) {
        console.log('Citation element not found on the page.');
        return; 
    }

    const scholarProfileUrl = `https://scholar.google.com/citations?user=${scholarId}&hl=en`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(scholarProfileUrl)}`;
    
    console.log('Step 1: Starting to fetch citation count...');
    citationElement.textContent = '...';

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Step 2: Successfully fetched data from proxy.');

        const htmlContent = data.contents;
        if (!htmlContent || htmlContent.length < 100) {
            throw new Error('Proxy returned empty or invalid HTML content.');
        }

        console.log('Step 3: HTML content received. Parsing...');
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const countElement = doc.querySelector('#gsc_rsb_st .gsc_rsb_std');
        
        if (countElement) {
            console.log('Step 4: Found citation element. Updating value.');
            const citationCount = parseInt(countElement.textContent, 10);
            animateValue(citationElement, 0, citationCount, 1500);
        } else {
            throw new Error('Could not find citation count element on the page. (Likely a CAPTCHA was served).');
        }

    } catch (error) {
        console.error('Final Error:', error);
        citationElement.textContent = '125+';
    }
}


function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    
    getCitationCount();
    
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