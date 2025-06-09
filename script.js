window.addEventListener('scroll', function() {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > window.innerHeight * 0.9) { // Appear after scrolling 90% of the hero section
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
});
