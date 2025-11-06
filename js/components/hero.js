const SLIDESHOW_CONFIG = {
    slides: [
        {
            image: '../../assets/img/hero-section.jpg',
            alt: 'CCTV Security Systems'
        },
        {
            image: '../../assets/img/logo.png',
            alt: 'Access Control Systems'
        },
        {
            image: '../../assets/img/hero-section.jpg',
            alt: 'Alarm Systems'
        },
        {
            image: '../../assets/img/logo.png',
            alt: 'Fire Safety Systems'
        }
    ],
    settings: {
        autoPlay: true,
        slideDuration: 5000,
        transitionDuration: 1500,
        pauseOnHover: true
    }
};

export function initHero() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    setupSlideshow();
}

function setupSlideshow() {
    const slideshow = document.querySelector('[data-slideshow]');
    const dotsContainer = document.querySelector('[data-dots]');

    if (!slideshow || !dotsContainer) return;

    generateSlides(slideshow);
    generateDots(dotsContainer);

    const slides = document.querySelectorAll('.background-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('[data-prev]');
    const nextBtn = document.querySelector('[data-next]');
    const navContainer = document.querySelector('[data-slideshow-nav]');

    if (!slides.length || !dots.length) return;

    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        if (!SLIDESHOW_CONFIG.settings.autoPlay) return;

        stopSlideShow();
        slideInterval = setInterval(nextSlide, SLIDESHOW_CONFIG.settings.slideDuration);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            prevSlide();
            startSlideShow();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            stopSlideShow();
            showSlide(slideIndex);
            startSlideShow();
        });
    });

    if (SLIDESHOW_CONFIG.settings.pauseOnHover && navContainer) {
        navContainer.addEventListener('mouseenter', stopSlideShow);
        navContainer.addEventListener('mouseleave', startSlideShow);
    }

    startSlideShow();
}

function generateSlides(slideshow) {
    slideshow.innerHTML = '';

    SLIDESHOW_CONFIG.slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `background-slide ${index === 0 ? 'active' : ''}`;
        slideElement.setAttribute('data-slide', index);
        slideElement.style.backgroundImage = `url('${slide.image}')`;
        slideElement.setAttribute('aria-label', slide.alt);
        slideshow.appendChild(slideElement);
    });
}

function generateDots(dotsContainer) {
    dotsContainer.innerHTML = '';

    SLIDESHOW_CONFIG.slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsContainer.appendChild(dot);
    });
}