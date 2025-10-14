document.addEventListener('DOMContentLoaded', function () {
    if (typeof initTheme === 'function') initTheme();
    if (typeof initHeroParallax === 'function') initHeroParallax();
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initServices === 'function') initServices();
    if (typeof initPartners === 'function') initPartners();
    if (typeof initContact === 'function') initContact();
    if (typeof initUtils === 'function') initUtils();

    initScrollAnimations();
});

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .service-card, .feature-card, .contact-item, .contact-form');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}