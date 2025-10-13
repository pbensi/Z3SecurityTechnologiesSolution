// Main entry point for the application
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    if (typeof initTheme === 'function') initTheme();
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initServices === 'function') initServices();
    if (typeof initPartners === 'function') initPartners();
    if (typeof initContact === 'function') initContact();
    if (typeof initUtils === 'function') initUtils();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-item, .section-title');
    
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
        element.classList.add('scroll-fade-in');
        observer.observe(element);
    });
}