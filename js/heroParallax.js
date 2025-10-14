function initHeroParallax() {
    const heroContent = document.querySelector('.hero-content');
    const slides = document.querySelectorAll('.slide img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        slides.forEach(img => {
            img.style.transform = `translateY(${scrolled * 0.25}px)`; 
        });

        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
}