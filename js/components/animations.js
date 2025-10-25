export function initAnimations() {
    initScrollAnimations();
    initPartnerCarousel();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    const capacityCards = document.querySelectorAll('.capacity-card');
    const capacityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                capacityObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    capacityCards.forEach(card => {
        capacityObserver.observe(card);
    });

    const clientCards = document.querySelectorAll('.client-card');
    const clientObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                clientObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    clientCards.forEach(card => {
        clientObserver.observe(card);
    });
}

function initPartnerCarousel() {
    const track = document.querySelector('.partners-track');
    if (!track) return;

    const originalContent = track.innerHTML;
    track.innerHTML += originalContent;

    track.addEventListener('mouseenter', () => {
        track.classList.add('paused');
    });

    track.addEventListener('mouseleave', () => {
        track.classList.remove('paused');
    });
}